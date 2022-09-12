<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $inData = getRequestInfo();

    $id = 0;
    $firstName = "";
    $lastName = "";
	
    $servername = "localhost";
    $username = "G10ApiAccessUser";
    $password = "WeLoveCOP4331WithLeinecker";
    $db = "COP4331_G10_db";
    $conn = new mysqli($servername, $username, $password, $db);


    if($conn->connect_error){
        returnWithError( $conn->connect_error );
    }  
    if(isset($inData["login"], $inData["password"])){
        
        $firstName = $inData['firstName'];
        $lastName = $inData['lastName'];
        $Username = $inData['login'];
        $hash = HASH('sha256', $inData['password'], false);
        
        $stmt = $conn->prepare("SELECT COUNT(*) FROM Users WHERE `Login` = ?");

        $stmt->bind_param("s", $Username);

        if ( ! $stmt->execute()) {
            trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
        }

        $count = null;
        $stmt->bind_result($count);
        while ($stmt->fetch()) { 
            $count;
        }
              

        if($count > 0) {
            returnWithError("username already exists");
        }else {
            $stmt = $conn->prepare("INSERT INTO Users (`firstName`, `lastName`, `login`, `password`) VALUES (?, ?, ?, ?);");
            $stmt->bind_param("ssss", $firstName, $lastName, $Username, $hash);
            $stmt->execute();


            $stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
            $stmt->bind_param("ss", $Username, $hash);
            $stmt->execute();
            $result = $stmt->get_result();
            if( $row = $result->fetch_assoc())
            {
			    returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
            }
            //echo 'account successfully added';
            echo '<script type = "text/javascript">';
            echo 'alert("your account has been added!")';
            echo 'window.location.href = "register.php';
            echo '</script>';
        }
        $stmt->close(); 
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }
    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }
    function returnWithError( $err )
    {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
        exit();
    }
    function returnWithInfo( $firstName, $lastName, $id )
	{
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>