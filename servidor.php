<?php
header("Access-Control-Allow-Origin: *"); // allow request from all origin
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");

header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.



//  Para poder hacer uso de la clase jwt:
require_once 'jwt.php';
$jwt = new jwt();
$claveSecreta = 'Ciao bella ciao';

//  Vamos a comprobar el JWT:
//  Obtenemos el JWT que nos ha debido de pasar el cliente (en la cabecera):
$token = $jwt->getBearerToken();
if (($token == null) || ($token == "")) {
	//  Devuelve información indicando que la sesión NO está creada:
	print '{"sesion":"NO"}';
	//  Finaliza la ejecución:
  return;
}

$tokenValido = $jwt->validarJWT($token, $claveSecreta);
// var_dump($tokenValido);

if (!$tokenValido->valido) {
	//  Devuelve información indicando que la sesión NO está creada:
	print '{"sesion":"NO"}';
	//  Finaliza la ejecución:
  return;
}


/*
	****************************************************************************

  ¡¡¡¡¡ SI LLEGAMOS AQUI ES PORQUE EL TOKEN ES VALIDO Y NO HA EXPIRADO !!!!

	****************************************************************************

	(El resto ya es similar a lo visto anteriormente)
*/



//  Definimos la variable global $idUsuairo:
$idUsuairo = $tokenValido->datos->id;


//  Instanciamos un objeto del tipo BD_Servidor:
$bd = new BD_Servidor();


//  Con esta línea recogemos los datos (en formato JSON), enviados por el cliente:
$datos = file_get_contents('php://input');  //  $datos es un string, y no un objeto php
//  Lo convertimos a un objeto php:
$objeto=json_decode($datos);

// print "<br>Datos: " . $datos;
// return;


switch ($objeto->servicio) {
	/*******casos de carrito***********/
	case "getCarrito":  //cojemos los datos del carrito asociado al  id del cliente
			print json_encode($bd->getCarrito($objeto->id));
		break;
	case "anadirCarrito": //añade el dato del carrito y asociandolo con el id del cliente
		if($bd->anadirCarrito($objeto))
				print json_encode($bd->getCarrito($objeto->id));
		else
			print '{"result":"FAIL"}';
		break;
		
	case "borrarCarrito":  //borra los datos del carrito segun id del cliente
		if($bd->borrarCarrito($objeto->id))
			print '{"result":"OK"}';
		else
			print '{"result":"FAIL"}';
		break;
	case "insertarFacturaId": //se ha creado ya que necesitabamos que insertara las facturas pero nos devuelva la ultima insertada
		print json_encode($bd->insertarFacturaId($objeto));
		break;
	case "insertarDetalleArray"://Lo creamos ya que necesitamos recoreere un array e ir insertando los datos
		if($bd->insertarDetalleArray($objeto->arrayObjeto ,$objeto->id))
			print '{"result":"OK"}';
		else
			print '{"result":"FAIL"}';
		break;
	case "borrarCarritoDetalle": //añade el dato del carrito y asociandolo con el id del cliente
		if($bd->borrarCarritoDetalle($objeto->idCarrito))
			print json_encode($bd->getCarrito($objeto->id));
		else
			print '{"result":"FAIL"}';
		break;
	
	/******FIN DE  casos de carrito***********/
	/***********CASO DE PERSONAS**********/

	case "listadoPersonas":
			print json_encode($bd->listadoPersonas());
			break;				
	case "insertarPersona":
			$bd->insertarPersona($objeto);
			print json_encode($bd->listadoPersonas());
			break;
	case "borrarPersona":
		if($bd->borrarPersona($objeto->id))
			print json_encode($bd->listadoPersonas());
		else
			print '{"result":"FAIL"}';	
		break;
	case "listarPersonaId":
		print json_encode($bd->listarPersonaId($objeto->id));
		break;
	case "modificaPersona":
		if($bd->modificaPersona($objeto->persona))
					print json_encode($bd->listarPersonaId($objeto->id));
		else
		return false;
			
		break;
	case "modificaClave":
		if($bd->modificaClave($objeto))
			print '{"result":"OK"}';
		else
			print '{"result":"FAIL"}';
		break;
	case "listarRol":
		print json_encode($bd->listarRol());
		break;
		/***********FIN CASO DE PERSONAS**********/
		
	case "listarFactura":
		print json_encode($bd->listarFactura());
		break;
		
	case "listarFacturaId":
		print json_encode($bd->listarFacturaId($objeto->id));
		break;
			
	

		
	case "insertarFactura":
		if($bd->insertarFactura($objeto))
			print json_encode($bd->listarFactura());
		else
			print '{"result":"FAIL"}';	
		break;
	
	
	case "borrarFactura": 
		if ($bd->borrarFactura($objeto->id))
			print json_encode($bd->listarFactura());
		else
			print '{"result":"FAIL"}';
		break;
	

	case "listarDetalle":
		print json_encode($bd->listarDetalle($objeto->id));
		break;
	case "listarProductos":
		print json_encode($bd->listarProductos());
		break;
	case "listarProductosCategoria":
		print json_encode($bd->listarProductosCategoria($objeto->categoria));
		break;
	case "listarProductoId":
		print json_encode($bd->listarProductoId($objeto->id));
		break;
	case "insertarProducto":
		if($bd->insertarProducto($objeto))
			print '{"result":"OK"}';
		else
			print '{"result":"FAIL"}';
		break;
	
	case "modificarProducto":
		if($bd->modificarProducto($objeto))
			print '{"result":"OK"}';
		else
			print '{"result":"FAIL"}';
		break;
		
	case "borrarProducto": 
		if ($bd->borrarProducto($objeto->id))
		print json_encode($bd->listarProductos());
		else
			print '{"result":"FAIL"}';
	break;
	
	
	case "insertarDetalle":
		if($bd->insertarDetalle($objeto))
			print json_encode($bd->listarDetalle($objeto->IDFACTURA));
		else
			print '{"result":"FAIL"}';
		break;

		
	case "modificarDetalle":
		if($bd->modificarDetalle($objeto))
			print json_encode($bd->listarDetalle($objeto->IDFACTURA));
		else
			print '{"result":"FAIL"}';
		break;
	
	case "listarDetalleId":
		print json_encode($bd->listarDetalleId($objeto->id));
		break;
	case "sacarCategoria":
		print json_encode($bd->sacarCategoria());
		break;
		

	case "borrarDetalle": 
			$bd->borrarDetalle($objeto->id);
			if ($objeto->listado == "OK")
				print json_encode($bd->listarDetalle($objeto->idFactura));
			else
				print '{"result":"OK"}';
			break;
			
					
	case "insertarComentario": //  Hacemos que devuelva el que ha insertado
				print json_encode($bd->insertarComentario($objeto->comentario));
				break;
	case "listarComentarios":
		print json_encode($bd->listarComentarios());
		break;
	


	/***********categorias***********/
		case "listarcategoria":
			print json_encode($bd->listarcategoria());
			break;
case "insertarcategoria": //  Hacemos que devuelva el que ha insertado
				print json_encode($bd->insertarcategoria($objeto->categoria));
				break;
				
	case "borrarcategoria":
		if($bd->borrarcategoria($objeto->id))
					print '{"result":"OK"}';
		else
			print '{"result":"FAIL"}';	
		break;
	
	case "modificaCategoria":
		if($bd->modificaCategoria($objeto->categoria))
			print '{"result":"OK"}';	
		else
			print '{"result":"FAIL"}';	
		break;
	default:
			print '{"servicio": "NO"}';
}



class BD_Servidor {

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
//CATEGORIA

public function insertarcategoria($data) {

	try {
			$sql = "INSERT INTO `categorias` (`IDCATEGORIA`, `NOMBRE`) VALUES (NULL, ?);";
			$this->pdo->prepare($sql)->execute(array($data->NOMBRE));
			//  Recuperamos el id que le ha dado:
			$data->IDCATEGORIA = $this->pdo->lastInsertId();
			return $data;
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
	public function listarcategoria() {

		try {
			$sc = "SELECT * FROM categorias";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	
	public function modificaCategoria($data){
		try {
			$sql = "UPDATE `categorias` SET `NOMBRE` = ? WHERE `categorias`.`IDCATEGORIA` = ?";
			$this->pdo->prepare($sql)->execute(array(
							$data->NOMBRE, 
							$data->IDCATEGORIA));
			return true;
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
public function borrarcategoria($id) {
			try {
			$this->pdo->beginTransaction();		
			//  Ahora borramos la el producto con esa categoria

			$stm = $this->pdo->prepare("DELETE FROM `productos` WHERE `productos`.`CATEGORIA` = ?");    			 
			$stm->execute(array($id));
			//AHORRA BORRAMOS La categoria
			$stm = $this->pdo->prepare("DELETE FROM `categorias` WHERE `categorias`.`IDCATEGORIA`  = ?");    			 
			$stm->execute(array($id));
	
			//  Confirmamos (consolidamos) los deletes:
			$this->pdo->commit();	
			return true;
		} catch(Exception $e) {
			die($e->getMessage());
			//  Deshacemos los delete y devolvemos error (false):
			$this->pdo->rollBack();
			return false;
		}
		
	}
	//COMENTARIOS
	public function listarComentarios() {

		try {
			$sc = "SELECT u.nombre,u.apellidos,c.* FROM COMENTARIOS as c join usuarios as u on c.IDCLIENTE=u.id ORDER BY FECHA DESC ";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	public function insertarComentario($datos) {
	
		$fecha=date("Y-m-d");
		$datos->FECHA=$fecha;
		try {
			$sql = "INSERT INTO `comentarios` (`IDCOMENTARIO`, `IDCLIENTE`, `COMENTARIO`, `FECHA`, `PUNTAJE`) VALUES (NULL, ?, ?,?, ?)";
			$stm = $this->pdo->prepare($sql);
			$stm->execute(array(
					$datos->IDCLIENTE,
					$datos->COMENTARIO,
					$datos->FECHA,
					$datos->PUNTAJE
			));
				
			//  Recuperamos el id que le ha dado:
			$datos->IDCOMENTARIO = $this->pdo->lastInsertId();
			return $datos;
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
	
	public function sacarCategoria(){
		try {
			$sc="select * from categorias";//mandaremos la consulta para que nos retorne un string de lo que necesitamos
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
			} catch (Exception $e) {
				die($e->getMessage());
			
			}
	}
	
	
	public function borrarCarrito($id) {
		try {
			$sc = "DELETE FROM `carrito` WHERE `carrito`.`IDCLIENTE` = $id;";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return true;

		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	public function borrarCarritoDetalle($id) {
		try {
			$sc = "DELETE FROM `carrito` WHERE `carrito`.`IDCARRITO` = $id;";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return true;

		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	
	
	public function listadoPersonas() {
		try {
			$sc = "SELECT * FROM `usuarios` JOIN roles on usuarios.tipo=roles.COD ";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	public function listarPersonaId($id){
		try {
			$sc = "Select * From usuarios where id=$id";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return ($stm->fetch(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	public function borrarPersona($id) {//NO BORRAMOS LAS FACTURAS YA QUE DESEAMOS GUARDARLAS
	
			try {
			$this->pdo->beginTransaction();		
			//  Ahora borramos el carrito asociado a la persona:

			$stm = $this->pdo->prepare("DELETE FROM `carrito` WHERE `carrito`.`IDCLIENTE` = ?");    			 
			$stm->execute(array($id));
			//AHORRA BORRAMOS LOS comentarios
			$stm = $this->pdo->prepare("DELETE FROM `comentarios` WHERE `comentarios`.`IDCLIENTE`  = ?");    			 
			$stm->execute(array($id));
			//  Ahora borramos a la persona:
			$stm = $this->pdo->prepare("Delete From usuarios Where id = ?");                      
			$stm->execute(array($id));
			//  Confirmamos (consolidamos) los deletes:
			$this->pdo->commit();	
			return true;
		} catch(Exception $e) {
			die($e->getMessage());
			//  Deshacemos los delete y devolvemos error (false):
			$this->pdo->rollBack();
			return false;
		}
		
	}


	
	public function insertarPersona($datos) {
		try {
			$sc = "Insert into usuarios(email, nombre,clave,apellidos,tipo,dni) Values(?,?,?, ?,?,?)";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array(
					$datos->email,
					$datos->nombre,
					md5($datos->clave),
					$datos->apellidos,
					$datos->tipo,
					$datos->dni,

			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}
	
	/****FUNCION PARA MODIFICAR PERSONA PASANDO TODOS LOS DATOS DE LA PERSONA Y ENCRIPTANDO LA CLAVE*/
	public function modificaPersona($data) {
		
		try {
			if($data->clave){
				$sql = "UPDATE  usuarios SET nombre = ?,
										apellidos = ?,
										clave = md5(?), 
										email = ?, 
										tipo = ?, 
										dni = ? 
						WHERE usuarios.id = ?";

									
			$this->pdo->prepare($sql)->execute(array(
							$data->nombre, 
							$data->apellidos, 
							$data->clave, 

							$data->email,
							$data->tipo,
							$data->dni,
							$data->id));
			return true;
			}else{
				$sql = "UPDATE  usuarios SET nombre = ?,
										apellidos = ?, 
										email = ?, 
										tipo = ?, 
										dni = ? 
						WHERE usuarios.id = ?";

									
			$this->pdo->prepare($sql)->execute(array(
							$data->nombre, 
							$data->apellidos, 
							$data->email,
							$data->tipo,
							$data->dni,
							$data->id));
			return true;
			}
			
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
	
	public function modificaClave($data) {
		try {
			$sc = "SELECT * from usuarios where clave =md5(?) and usuarios.id = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array(
							$data->claveDeAHORA,
							$data->id));
						
			if ($stm->rowCount() == 0)
				return false;
			else{
				$sql = "UPDATE  usuarios SET clave = md5(?)
						WHERE usuarios.id = ?";					
				$this->pdo->prepare($sql)->execute(array(
							$data->clave,
							$data->id));
					return true;
				
			}
		} catch (Exception $e) {
			die($e->getMessage());
		}
		
		
	}
public function listarRol(){
	try {
			$sc = "SELECT * FROM `roles`";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			$res = $stm->fetchAll(PDO::FETCH_OBJ);
			return ($res);
		} catch(Exception $e) {
			die($e->getMessage());
		}
	
}
	public function listarFactura() {
		try {
			$sc = "SELECT * FROM `facturas` ORDER BY ID";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			$res = $stm->fetchAll(PDO::FETCH_OBJ);
			return ($res);
		} catch(Exception $e) {
			die($e->getMessage());
		}
	}
		public function listarFacturaId($id) {
		try {
			$sc = "SELECT * FROM facturas where facturas.ID_CLIENTE= $id ORDER BY ID";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			$res = $stm->fetchAll(PDO::FETCH_OBJ);
			return ($res);
		} catch(Exception $e) {
			die($e->getMessage());
		}
	}
	
	

	public function borrarFactura($id) {
		try {
			$this->pdo->beginTransaction();		
			$stm = $this->pdo->prepare("DELETE FROM detalle_facturas WHERE ID_FACTURA = ?");    			 
			$stm->execute(array($id));
			//  Ahora borramos al veterinario:
			$stm = $this->pdo->prepare("DELETE FROM facturas WHERE ID = ?");                      
			$stm->execute(array($id));
			//  Confirmamos (consolidamos) los deletes:
			$this->pdo->commit();	
			return true;
		} catch(Exception $e) {
			die($e->getMessage());
			//  Deshacemos los delete y devolvemos error (false):
			$this->pdo->rollBack();
			return false;
		}
	}
	
	
	public function insertarFactura($datos){
		
		try {
			
			$sc = "INSERT INTO `facturas` (`ID`, `NUMERO`, `ID_CLIENTE`, `FECHA`) VALUES (NULL, ?, ?,?)";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array(
					$datos->NUMERO,
					$datos->IDCLIENTE,
					$datos->FECHA,

			));
			return true;
			
			
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}

	}
	
	public function insertarFacturaId($datos){
		
		try {
			
			$sc = "INSERT INTO `facturas` (`ID`, `NUMERO`, `ID_CLIENTE`, `FECHA`) VALUES (NULL, ?, ?,?)";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array(
					$datos->NUMERO,
					$datos->IDCLIENTE,
					$datos->FECHA,

			));
			$res =  $this->pdo->lastInsertId();

			return $res;
			
			
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}

	}
	
	public function insertarProducto($datos){
		
	try {
		$sc = "INSERT INTO `productos` (`CODPRODUCTO`, `NOMBRE`, `DESCRIPCION`,  `FOTO`, `PRECIO`, `TIPOIVA`, `CATEGORIA`)
									VALUES (NULL, ?, ?,?,?,?,?)";
		$stm = $this->pdo->prepare($sc);
		$stm->execute(array(
				$datos->NOMBRE,
				$datos->DESCRIPCION,
				$datos->FOTO,
				$datos->PRECIO,
				$datos->TIPOIVA,
				$datos->CATEGORIA
		));
		return true;
		
		
	} catch (Exception $e) {
		die($e->getMessage());
		return false;
	}

}
public function modificarProducto($data){
		
	try {
		
			$sql = "UPDATE productos SET NOMBRE = ? , DESCRIPCION = ? , FOTO = ?,PRECIO = ? , TIPOIVA = ?, CATEGORIA = ?
			WHERE productos.CODPRODUCTO = ?";
		$this->pdo->prepare($sql)->execute(array($data->NOMBRE, $data->DESCRIPCION,
											 $data->FOTO, $data->PRECIO,
											 $data->TIPOIVA,$data->CATEGORIA,$data->CODPRODUCTO));		
		return true;
		
		
	} catch (Exception $e) {
		die($e->getMessage());
		return false;
	}

}



	/*LISTAMOS TODOS LOS DATOS DEL DETALLE DE UNA FACTURA*/
	public function listarDetalle($id) {
		try {
			$sc = "select * from detalle_facturas as d RIGHT join productos as p
			 on d.CODPRODUCTO=p.CODPRODUCTO where ID_FACTURA=$id";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			$res = $stm->fetchAll(PDO::FETCH_OBJ);
			
			return ($res);
		} catch(Exception $e) {
			die($e->getMessage());
		}
	}
	/*LISTAMOS  DATOS DE UN DETALLE*/
	public function listarDetalleId($id) {
		try {
			$sc = "select * from detalle_facturas as d RIGHT join productos as p
			 on d.CODPRODUCTO=p.CODPRODUCTO where ID=$id";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			$res = $stm->fetch(PDO::FETCH_OBJ);
			return ($res);
		} catch(Exception $e) {
			die($e->getMessage());
		}
	}
	public function listarProductos() {

		try {
			$sc = "Select *,c.NOMBRE as NOMBRECATEGORIA,p.NOMBRE as NOMBREPRODUCTO From productos as p join categorias as c on p.CATEGORIA=c.IDCATEGORIA order by nombreCategoria";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	
	public function listarProductosCategoria($categoria) {

		try {
			$sc = "Select * From productos where CATEGORIA= ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($categoria));
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	public function listarProductoId($id) {
		try {
			$sc = "Select * From productos where CODPRODUCTO=?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($id));
			return ($stm->fetch(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	
	public function borrarProducto($id) {
			try {
			$this->pdo->beginTransaction();		
			
			//AHORRA BORRAMOS LOS productos del carrito si hubiese
			
			$stm = $this->pdo->prepare("DELETE FROM `carrito` WHERE `carrito`.`CODPRODUCTO`   = ?");    			 
			$stm->execute(array($id));
		//AHORRA BORRAMOS LOS productos del DETALLE si hubiese


			$stm = $this->pdo->prepare("DELETE FROM `detalle_facturas` WHERE `detalle_facturas`.`CODPRODUCTO` =  ?");                      
			$stm->execute(array($id));
			//  Ahora borramos el PRODUCTO:

			$stm = $this->pdo->prepare("DELETE FROM productos WHERE CODPRODUCTO = ?");                      
			$stm->execute(array($id));
		
			//  Confirmamos (consolidamos) los deletes:
			$this->pdo->commit();	
			return true;
		} catch(Exception $e) {
			die($e->getMessage());
			//  Deshacemos los delete y devolvemos error (false):
			$this->pdo->rollBack();
			return false;
		}
		try {

			$stm = $this->pdo->prepare("DELETE FROM productos WHERE CODPRODUCTO = ?");                      
			$stm->execute(array($id));
			return true;

		} catch(Exception $e) {
			die($e->getMessage());
		}
	}
	
	
	public function insertarDetalle($datos){
	try {

		$sc = "INSERT INTO `detalle_facturas` (`ID`, `ID_FACTURA`, `CANTIDAD`, `CODPRODUCTO`) VALUES (NULL, ?, ?,?)";
		$stm = $this->pdo->prepare($sc);
		$stm->execute(array(
				$datos->IDFACTURA,
				$datos->CANTIDAD,
				$datos->CODPRODUCTO,

		));
		return true;
	} catch (Exception $e) {
		die($e->getMessage());
		return false;
	}

	}
	
	
	public function insertarDetalleArray($datos,$id){
		
	try {
		foreach($datos as $value){
			$sc ="INSERT INTO `detalle_facturas` (`ID`, `ID_FACTURA`, `CANTIDAD`, `CODPRODUCTO`) VALUES (NULL, $id, ?,?)";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array(
					$value->CANTIDAD,
					$value->CODPRODUCTO
			));
		}		
	
		return true;
	} catch (Exception $e) {
		die($e->getMessage());
		return false;
	}

	}
	
	public function modificarDetalle($data) {
		try {
		$sql = "UPDATE detalle_facturas SET CANTIDAD = ? , CODPRODUCTO = ?  WHERE detalle_facturas.ID = ?";
		$this->pdo->prepare($sql)->execute(array($data->CANTIDAD, $data->CODPRODUCTO, $data->ID));		
		return true;
	} catch (Exception $e) {
			die($e->getMessage());
			return false;
	}
	}
	public function borrarDetalle($id) {
		try {
			$stm = $this->pdo->prepare("DELETE FROM detalle_facturas WHERE ID = ?");                      
			$stm->execute(array($id));
			return true;

		} catch(Exception $e) {
			die($e->getMessage());
		}
	}
	//******SERVICIOS DE CARRITO**************/
	public function getCarrito($id) {

		try {
			$sc = "SELECT c.IDCARRITO,C.CODPRODUCTO,c.IDCLIENTE,p.NOMBRE,p.PRECIO ,p.TIPOIVA,SUM(CANTIDAD)AS CANTIDAD ,SUM(PRECIO*CANTIDAD)
			as precioTotal FROM carrito as c LEFT JOIN productos as p on c.CODPRODUCTO=p.CODPRODUCTO where IDCLIENTE= ? GROUP BY CODPRODUCTO";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($id));
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	public function anadirCarrito($datos){
		try {
		$sc = "INSERT INTO `carrito` (`CODPRODUCTO`, `IDCLIENTE`, `CANTIDAD`, `IDCARRITO`) VALUES (?,?,?, NULL);";
		$stm = $this->pdo->prepare($sc);
		$stm->execute(array(
				$datos->CODPRODUCTO,
				$datos->id,
				$datos->cantidad,

		));
		return true;
	} catch (Exception $e) {
		die($e->getMessage());
		return false;
	}
	}
	

		
	
	
	
	
}  //  class BD_login

?>




