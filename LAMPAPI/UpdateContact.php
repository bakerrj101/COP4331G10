<?php
	$inData = getRequestInfo();
	
	$ID = $inData["ID"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNumber = $inData["phoneNumber"];
	$email = $inData["email"];
	$address = $inData["address"];
	$zip = $inData["zip"];
	$city = $inData["city"];
	$state = $inData["state"];
	$userID = $inData["userID"];

	$conn = new mysqli("localhost", "G10ApiAccessUser", "WeLoveCOP4331WithLeinecker", "COP4331_G10_db");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET firstName=?, lastName=?, phoneNumber=?, email=?, address=?, zip=?, city=?, state=? WHERE ID = $ID and userID = $userID");
		$stmt->bind_param("ssssssss", $firstName, $lastName, $phoneNumber, $email, $address, $zip, $city, $state);
		$stmt->execute();
		$result = $stmt->get_result();

       	returnWithInfo( $ID, $firstName, $lastName, $phoneNumber, $email, $address, $zip, $city, $state, $userID );
	
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $id, $firstName, $lastName, $phoneNumber, $email, $address, $zip, $city, $state, $userId )
	{
    	$retValue = '{"id":"' . $id . '", "firstName" : "' . $firstName. '", "lastName" : "' . $lastName. '", "phoneNumber" : "' . $phoneNumber. '", "email" : "' . $email. '", "address" : "' . $address. '", "zip" : "' . $zip. '", "city" : "' . $city. '", "state" : "' . $state. '", "userId" : "' . $userId. '"}';
    	sendResultInfoAsJson( $retValue );
	}
	
?>