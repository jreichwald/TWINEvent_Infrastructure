/** 
Source-JSON-Message from esp32: 
{
    "thingId" : "test:esp32", 
    "value" : 128
}


Target-JSON-Message (Ditto-Protocol): 
{
    "thingId": "test:esp32",
    "policyId": "test:policy",
    "features": {
        "temp_sensor": {
            "properties": {
            "value": 128
            }
        }
    }
}
*/

const { DefaultSerializer } = require("v8");


function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString); 
    const thingId = jsonData.thingId.split(':'); 
    const value = { 
        temp_sensor: { 
            properties: { 
                value: jsonData.value 
            } 
        }
    };    
    return Ditto.buildDittoProtocolMsg(
        thingId[0], // your namespace 
        thingId[1], 
        'things', // we deal with a thing
        'twin', // we want to update the twin
        'commands', // create a command to update the twin
        'modify', // modify the twin
        '/features', // modify all features at once
        headers, 
        value
    );
}



// MAPPING INCOMING Eclipse Kura

function mapToDittoProtocolMsg(
    headers,
    textPayload,
    bytePayload,
    contentType
) {
    
    if (contentType !== 'application/octet-stream') {
        return null; // only handle messages with content-type application/octet-stream
    }
    
    let view = new DataView(bytePayload);
    
    let value = {
        temperature: {
            properties: {
                // interpret the first 2 bytes (16 bit) as signed int and divide through 100.0:
                value: view.getInt16(0) / 100.0
            }
        },
        pressure: {
            properties: {
                // interpret the next 2 bytes (16 bit) as signed int:
                value: view.getInt16(2)
            }
        },
        humidity: {
            properties: {
                // interpret the next 1 bytes (8 bit) as unsigned int:
                value: view.getUint8(4)
            }
        }
    };

    return Ditto.buildDittoProtocolMsg(
        'org.eclipse.ditto', // in this example always the same
        headers['device_id'], // Eclipse Hono sets the authenticated device_id as AMQP 1.0 header
        'things', // we deal with a Thing
        'twin', // we want to update the twin
        'commands', // we want to create a command to update a twin
        'modify', // modify the twin
        '/features', // modify all features at once
        headers, // pass through the headers from AMQP 1.0
        value
    );
}





// template

/**
 * Maps the passed parameters to a Ditto Protocol message.
 * @param {Object.<string, string>} headers - The headers Object containing all received header values
 * @param {string} [textPayload] - The String to be mapped
 * @param {ArrayBuffer} [bytePayload] - The bytes to be mapped as ArrayBuffer
 * @param {string} [contentType] - The received Content-Type, e.g. "application/json"
 * @returns {(DittoProtocolMessage|Array<DittoProtocolMessage>)} dittoProtocolMessage(s) -
 *  the mapped Ditto Protocol message,
 *  an array of Ditto Protocol messages or
 *  <code>null</code> if the message could/should not be mapped
 */
 function mapToDittoProtocolMsg(
    headers,
    textPayload,
    bytePayload,
    contentType
  ) {
  
    // ### Insert/adapt your mapping logic here.
    // Use helper function Ditto.buildDittoProtocolMsg to build Ditto protocol message
    // based on incoming payload.
    // See https://www.eclipse.org/ditto/connectivity-mapping.html#helper-functions for details.
    // ### example code assuming the Ditto protocol content type for incoming messages.
    if (contentType === 'application/json') {
      let parsedJson = JSON.parse(textPayload);
      // the following variables would be determined from the "parsedJson" and from the "headers":
      let namespace = "";
      let name = "";
      let group = "things";
      let channel = "twin";
      let criterion = "commands";
      let action = "modify";
      let path = "/attributes";
      let dittoHeaders = {};
      let value = {
        "a": 1
      };
      return Ditto.buildDittoProtocolMsg(
        namespace, 
        name, 
        group, 
        channel, 
        criterion, 
        action, 
        path, 
        dittoHeaders, 
        value)
    }
    // no mapping logic matched; return null to drop the message
    return null;
  }



{
    "sentOn":1639047663035,
    "metrics":{
        "di_Stop":false,
        "OperatingMode":"0",
        "assetName":"smartDTsensorbl"
    }
}

// Das ist Teil des piggyback
"mappingContext": {
    "mappingEngine": "JavaScript",
    "options": {
        "outgoingScript": "function mapFromDittoProtocolMsg(  namespace,  name,  group,  channel,  criterion,  action,  path,  dittoHeaders,  val,  status,  extra) {  let headers = dittoHeaders;  let textPayload = JSON.stringify({device: namespace + ':' + name, value: val});  let bytePayload = null;  let contentType = 'application/vnd.eclipse.ditto+json'; if (action == 'modified' && path == '/features'){return Ditto.buildExternalMsg(    headers,     textPayload,    bytePayload,     contentType   );}else return false;}"
    }
}


// Hier ist die Anleitung: https://github.com/eclipse/ditto-examples/tree/master/mqtt-quick-introduction
// test from {'temperature": 10, "humidity": 50, "thingId": "my.sensors:sensor01"}

// so bei uns: {"sentOn":1639146287518,"metrics":{"di_Stop":false,"OperatingMode":0,"assetName":"yumi"}}

// So sieht die DT Definition aus:
/*
{
    "policyId": "my.test:policy",
    "attributes": {
        "manufacturer": "Well known sensors producer",
        "serial number": "200",
        "location": "First floor"
    },
    "features": {
        "measurements": {
            "properties": {
                "temperature": 0,
                "humidity": 0
            }
        }
    }
}


{
	"thingId": "abb:yumi",
	"policyId": "abb:yumi",
	"attributes": {
		"location": "Mannheim",
		"manufacturer": "ABB",
		"roboter": "YuMi",
		"plc": "IRC5",
		"serial number": "4711"
	},
	"features": {
		"measurements": {
			"properties": {
				"di_Stop": true,
				"OperatingMode": "1"
			}
		}
	}
}

*/
function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    // Get sent data
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    // Parse received data
    const jsonData = JSON.parse(jsonString);
    // Get thing's namespace and ID
    const thingId = jsonData.thingId.split(':');
    // Prepare features to be set
    const value = {
            measurements: {
                properties: {
                    di_Stop: jsonData["metrics"]["di_Stop"],
                    OperatingMode: jsonData["metrics"]["OperatingMode"]
                }
            }
        };
    // Return Ditto Protocol message
	return Ditto.buildDittoProtocolMsg(
        'abb', // your namespace
        'yumi', // your namespace
        'things', // we deal with a thing
        'twin', // we want to update the twin
        'commands', // create a command to update the twin
        'modify', // modify the twin
        '/features', // modify all features at once
        headers,
        value
    );
}

function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const thingId = jsonData.thingId.split(':');
    const value = {
            measurements: {
                properties: {
                    di_Stop: jsonData["metrics"]["di_Stop"],
                    OperatingMode: jsonData["metrics"]["OperatingMode"]
                }
            }
        };
	return Ditto.buildDittoProtocolMsg(
        'abb', 
        'yumi', 
        'things', 
        'twin',
        'commands', 
        'modify',
        '/features', 
        headers,
        value
    );
}

function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {     const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));const jsonData = JSON.parse(jsonString);const value = {measurements: {properties: {di_Stop: jsonData[\"metrics\"][\"di_Stop\"],OperatingMode: jsonData[\"metrics\"][\"OperatingMode\"]}}};return Ditto.buildDittoProtocolMsg('abb','yumi','things','twin','commands','modify',         '/features',headers,value);}




function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonData = JSON.parse(textPayload);
    const value = {
            measurements: {
                properties: {
                    di_Stop: jsonData["metrics"]["di_Stop"],
                    OperatingMode: jsonData["metrics"]["OperatingMode"]
                }
            }
        };
	return Ditto.buildDittoProtocolMsg(
        'abb', 
        'yumi', 
        'things', 
        'twin',
        'commands', 
        'modify',
        '/features', 
        headers,
        value
    );
}




'{measurements: {properties: {di_Stop: \"47\",OperatingMode: \"11\"}}};'