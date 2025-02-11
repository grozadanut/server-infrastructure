<?php
$apiKey = "[key]"; //value provided by suport@web2sms.ro
$nonce = time();
$method = "POST";
$url = "/prepaid/message";
$sender = "1868";
$recipient = $argv[1]; //To be fill in !
$message = $argv[2];
$visibleMessage = "";
$scheduleDate = time(); //Format timestamp
$validityDate = ''; //Format timestamp
$callbackUrl = '';
$secret = "[secret]"; // value provided by suport@web2sms.ro
$string = $apiKey . $nonce . $method . $url . $sender .
       $recipient . $message . $visibleMessage . $scheduleDate .
       $validityDate . $callbackUrl . $secret;

$signature = hash('sha512', $string);
$data = array(
   "apiKey" => $apiKey,
   "sender" => $sender,
   "recipient" => $recipient,
   "message" => $message,
   "scheduleDatetime" => $scheduleDate,
   "validityDatetime" => $validityDate,
   "callbackUrl" => $callbackUrl,
   "userData" => "",
   "visibleMessage" => $visibleMessage,
   "nonce" => $nonce);
$curlurl = 'https://www.web2sms.ro/prepaid/message';
$ch = curl_init($curlurl);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_USERPWD, $apiKey . ":" . $signature);
$header = array();
$header[] = 'Content-type: application/json';
$header[] = 'Content-length: ' . strlen(json_encode($data));

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POST, 1);
//curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FAILONERROR, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
$postResult = curl_exec($ch);
echo $postResult;

if ($postResult === false)
{
   echo "<br/>";
   echo ('Curl error: ' . curl_error($ch) . "<br/>");
   echo ('Curl error nr: ' .
   curl_errno($ch) . "<br/>");
}

curl_close($ch);
?>
