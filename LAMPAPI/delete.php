<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);


    $inData = getRequestInfo();

    $servername = "localhost";
    $username = "G10ApiAccessUser";
    $password = "WeLoveCOP4331WithLeinecker";
    $db = "COP4331_G10_db";
    $conn = new mysqli($servername, $username, $password, $db);
    // $conn = new mysqli("localhost", "root", "", "API_TEST");

    if($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? AND UserID=?");
        $stmt->bind_param("ss", $inData["ID"], $inData["userId"], );
        $stmt->execute();
        if($stmt->affected_rows < 1){
            returnWithError("No Records Found");
        } else {
            returnWithInfo($inData["userId"]);

        } 
        

        $stmt->close();
        $conn->close();

    }

    
    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
    function returnWithError( $err )
    {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }
    function returnWithInfo($id )
    {
        $retValue = '{"id":' . $id . ',"error":""}';
        sendResultInfoAsJson( $retValue );
    }


?>