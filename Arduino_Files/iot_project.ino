#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <PubSubClient.h>
#include <Servo.h> 
WiFiClient esp8266device;
PubSubClient client(esp8266device);

const char* ssid = "BYTE_ADSL_26";
const char* password = "1135111351";
const char* mqtt_server = "192.168.1.21";
int servoPin = 9;
Servo Servo1;
Ticker blinker;
Ticker blinker2;
#define echoPin D7 // Echo Pin
#define trigPin D6 // Trigger Pin
#define echoPin2 D3 // Echo Pin
#define trigPin2 D2 // Trigger Pin
long duration, distance, duration2, distance2;
char TEMP_char[5];
int TEMP = 0;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected - ESP IP address: ");
  Serial.println(WiFi.localIP());
}

void callback (String topic, byte* data, unsigned int length) {
  char data_char[20];
  if (topic=="smartparking/gate") {
    for (int i = 0; i < 5; i++) {
      TEMP_char[i] = 0;
    }
    for (int i = 0; i < length; i++) {
      TEMP_char[i] = (char)data[i];
    }
    Serial.print("ret: ");
    Serial.print(TEMP_char);
    TEMP = atoi(TEMP_char);
    if(TEMP == 1) {
      Servo1.write(90);
    }
    if(TEMP == 0) {
      Servo1.write(0);
    }
    Serial.println("");
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("device1")) {
      Serial.println("connected");  
      client.subscribe("smartparking/gate");
    }
    else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void ultrasonic(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  char t[8];
  dtostrf(distance,6,2,t);
  client.publish("smartparking/ultrasonic",t);
  Serial.print("slot: ");
  Serial.println(distance);
}

void ultrasonic2(){
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  duration2 = pulseIn(echoPin2, HIGH);
  distance2 = duration2 * 0.034 / 2;
  char t[8];
  dtostrf(distance2,6,2,t);
  client.publish("smartparking/ultrasonic2",t);
  Serial.print("gate: ");
  Serial.println(distance2);
}

void setup(){
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  Servo1.attach(servoPin); 
  Servo1.write(0);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  blinker.attach(3, ultrasonic);
  blinker2.attach(3, ultrasonic2);
}

void loop() {
  if (!client.connected()) reconnect();
  if (!client.loop()) client.connect("device1");
} 
