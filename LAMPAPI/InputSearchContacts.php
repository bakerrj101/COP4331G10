<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "G10ApiAccessUser", "WeLoveCOP4331WithLeinecker", "COP4331_G10_db");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * from Contacts where (FirstName like ? OR LastName like ? OR PhoneNumber like ? OR Email like ? OR Address like ? OR Zip like ? OR City like ? OR State like ?) and UserID=?");
        $searchInput = "%" . $inData["search"] . "%";
		$stmt->bind_param("sssssssss", $searchInput, $searchInput, $searchInput, $searchInput, $searchInput, $searchInput, $searchInput, $searchInput, $inData["UserID"]);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
            $searchResults .= '{"id":"' . $row["ID"] . '", "firstName" : "' . $row["FirstName"]. '", "lastName" : "' . $row["LastName"]. '", "phoneNumber" : "' . $row["PhoneNumber"]. '", "email" : "' . $row["Email"]. '", "address" : "' . $row["Address"]. '", "zip" : "' . $row["Zip"]. '", "city" : "' . $row["City"]. '", "state" : "' . $row["State"]. '", "userID" : "' . $row["UserID"]. '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>