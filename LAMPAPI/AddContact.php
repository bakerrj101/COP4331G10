<?php
	$inData = getRequestInfo();
	
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
		$stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, PhoneNumber, Email, Address, Zip, City, State, UserId) VALUES(?,?,?,?,?,?,?,?,?)");
		$stmt->bind_param("sssssssss", $firstName, $lastName, $phoneNumber, $email, $address, $zip, $city, $state, $userId);
		$stmt->execute();
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
	
?>