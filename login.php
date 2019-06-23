<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.

//  Para poder hacer uso de la clase jwt:
require_once 'jwt.php';

$login = new BD_login();


//  Con esta línea recogemos los datos (en formato JSON), enviados por el cliente:
$datos = file_get_contents('php://input');  //  $datos es un string, y no un objeto php
//  Lo convertimos a un objeto php:
$objeto=json_decode($datos);

// print "<br>Datos: " . $datos;
// return;


// $objeto = new \stdClass;
// $objeto->servicio = "inicio_sesion";


if($objeto != null) {
    switch($objeto->servicio) {
			
			case "comprobar_email":
				print ($login->comprobar_email($objeto->email));
				break;
				
			case "inicio_sesion":
				print ($login->inicio_sesion($objeto));
				break;
			
			case "registrar": //añade el dato del carrito y asociandolo con el id del cliente
				if($login->registrar($objeto))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;
			
				
    }
} else
	print '{"data":"Sin datos"}';



class BD_login {

	private $pdo;
	private $claveSecreta = 'Ciao bella ciao';

	public function __CONSTRUCT() {
		try {
			$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
			$this->pdo = new PDO('mysql:host=localhost;dbname=paris8', 'root', '', $opciones);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                
		} catch(Exception $e) {
				die($e->getMessage());
		}
	}


//  TABLA USUARIOS:
	public function comprobar_email($email){
		try {
			$sc = "SELECT id FROM usuarios WHERE email = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($email));
			if ($stm->rowCount() == 0)
				return '{"estado":"libre"}';
			else
				return '{"estado":"ocupado"}';
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	
	public function registrar($datos) {
		try {
			$sc = "Insert into usuarios(email, nombre,clave,apellidos,tipo,dni) Values(?,?,?,?,101,?)";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array(
					$datos->email,
					$datos->nombre,
					md5($datos->clave),
					$datos->apellidos,
					$datos->dni,

			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}
	
	
public function inicio_sesion($datos){
		//  Instanciamos un objeto de la clase jwt:
		$jwt = new jwt();
		$dur = 1; // Ponemos una duración del token de 1 hora.
	//	$dur = 0.50; // Ponemos una duración del token de media hora.
		//$dur = 0.5/60; // Ponemos una duración del token de 1 minuto.
		
		$claveSecreta = 'Ciao bella ciao';
		try {
			$sc = "SELECT * ,roles.NOMBRE as nombreRol  FROM usuarios join roles on usuarios.tipo=roles.COD WHERE email = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($datos->email));
			if ($stm->rowCount() == 1) {
				$fila = $stm->fetch(PDO::FETCH_ASSOC);	
				
				if (($fila["email"] == $datos->email) && ($fila["clave"] == md5($datos->clave))) {
					//  Todo bien. Creamos el JWT:
					$miToken = $jwt->generarJWT($fila["id"], $fila["nombre"].$fila["apellidos"], $dur, $claveSecreta);
					//  Devolvemos los datos al cliente:
					return '{"id":' . $fila["id"] . ', 
						"nombre":"' . $fila["nombre"] . '", "apellidos":"' . $fila["apellidos"] . '", 
						"tipo":"' . $fila["nombreRol"] . '", 
						"JWT":"' . $miToken . '"}';
				}	else
						return '{"estado":"NO"}';
			} else {
				return '{"estado":"NO"}';
			}
		} catch (Exception $e) {
			die($e->getMessage());
		}
		
	}
	
	
	
	
	
	
}  //  class BD_login

	
?>


