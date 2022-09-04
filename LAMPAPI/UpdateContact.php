<?php
	$inData = getRequestInfo();
	
	$id = $inData["ID"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNumber = $inData["phoneNumber"];
	$email = $inData["email"];
	$address = $inData["address"];
	$zip = $inData["zip"];
	$city = $inData["city"];
	$state = $inData["state"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "G10ApiAccessUser", "WeLoveCOP4331WithLeinecker", "COP4331_G10_db");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET firstName=?, lastName=?, phoneNumber=?, email=?, address=?, zip=?, city=?, state=? WHERE ID = $id and userId = $userId");
		$stmt->bind_param("ssssssss", $firstName, $lastName, $phoneNumber, $email, $address, $zip, $city, $state);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
   		{
        	returnWithInfo($id, $row['firstName'], $row['lastName'], $row['phoneNumber'],  $row['email'], $row['address'], $row['zip'], $row['city'], $row['state'], $userId);
    	}
    	else
    	{
        	returnWithError("Contact Update Failed");
    	}
	
		$stmt->close();
		$conn->close();
		returnWithError("");
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
    	$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","phoneNumber":"' . $phoneNumber . '", "email":"' . $email . '", "address":"' . $address . '", "zip":"' . $zip . '", "city":"' . $city . '", "state":"' . $state . '", "userId":"' . $userId . '","error":""}';
    	sendResultInfoAsJson( $retValue );
	}
	
?>