<?php

    $inData = getRequestInfo();
	
    $servername = "localhost";
    $username = "G10ApiAccessUser";
    $password = "WeLoveCOP4331WithLeinecker";
    $db = "COP4331_G10_db";
    $conn = new mysqli($servername, $username, $password, $db);

    if($conn->connect_error){
        returnWithError( $conn->connect_error );
    }  
    if(isset($inData["input"], $inData["createpass"])){
        
        $firstName = $inData['firstName'];
        $lastName = $inData['lastName'];
        $Username = $inData['input'];
        $hash = HASH('sha256', $inData['createpass'], false);
        
        $stmt = $conn->prepare("SELECT COUNT(*) FROM Users WHERE `Login` = ?");

        $stmt->bind_param("s", $inData["login"]);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if($count > 0) {
            echo 'username exists';
            echo '<script type = "text/javascript">';
            echo 'alert("Username is taken!")';
            echo 'window.location.href = "register.php';
            echo '</script>';
        }else {
            $stmt = $conn->prepare("INSERT INTO Users (`FirstName`, `LastName`, `Login`, `Password`) VALUES (?, ?, ?, ?);");
            $stmt->bind_param("ssss", $firstName, $lastName, $Username, $hash);
            $stmt->execute();
            echo '<script type = "text/javascript">';
            echo 'alert("your account has been added!")';
            echo 'window.location.href = "register.php';
            echo '</script>';
        }
    
        $conn->close();
        echo 'end';
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

?>