 
  /**
 * Maps the passed parameters which originated from a Ditto Protocol message to an external message.
 * @param {string} namespace - The namespace of the entity in java package notation, e.g.: "org.eclipse.ditto". Or "_" 
 * (underscore) for connection announcements.
 * @param {string} name - The name of the entity, e.g.: "device".
 * @param {string} group - The affected group/entity: "things"|"policies"|"connections".
 * @param {string} channel - The channel for the signal: "twin"|"live"|"none"
 * @param {string} criterion - The criterion to apply: "commands"|"events"|"search"|"messages"|"announcements"|
 * "errors".
 * @param {string} action - The action to perform: "create"|"retrieve"|"modify"|"delete". Or the announcement name: 
 * "opened"|"closed"|"subjectDeletion". Or the subject of the message.
 * @param {string} path - The path which is affected by the message (e.g.: "/attributes"), or the destination
 * of a message (e.g.: "inbox"|"outbox").
 * @param {Object.<string, string>} dittoHeaders - The headers Object containing all Ditto Protocol header values.
 * @param {*} [value] - The value to apply / which was applied (e.g. in a "modify" action).
 * @param {number} [status] - The status code that indicates the result of the command. When this field is set,
 * it indicates that the Ditto Protocol Message contains a response.
 * @param {Object} [extra] - The enriched extra fields when selected via "extraFields" option.
 * @returns {(ExternalMessage|Array<ExternalMessage>)} externalMessage - The mapped external message, an array of 
 * external messages or <code>null</code> if the message could/should not be mapped.
 */
function mapFromDittoProtocolMsg(
  namespace,
  name,
  group,
  channel,
  criterion,
  action,
  path,
  dittoHeaders,
  value,
  status,
  extra
) {

  // ###
  // Insert your mapping logic here
  // ### example code using the Ditto protocol content type.
  let headers = dittoHeaders;
  let textPayload = JSON.stringify(Ditto.buildDittoProtocolMsg(namespace, name, group, channel, criterion, action, 
                                                               path, dittoHeaders, value, status, extra));
  let bytePayload = null;
  let contentType = 'application/vnd.eclipse.ditto+json';

  return Ditto.buildExternalMsg(
    headers, // The external headers Object containing header values
    textPayload, // The external mapped String
    bytePayload, // The external mapped byte[]
    contentType // The returned Content-Type
  );

  
}


// TELEMETRY
function mapFromDittoProtocolMsg(_namespace,_name,group,channel,criterion,action,path,dittoHeaders,val,status,extra) {let headers=dittoHeaders; let textPayload=JSON.stringify({namespace: _namespace, device: _name, property: path, value: val,timestamp: Date.now()}); let bytePayload=null; let contentType='application/vnd.eclipse.ditto+json'; return Ditto.buildExternalMsg(headers,textPayload,bytePayload,contentType);}

// CMD Schorz
function mapFromDittoProtocolMsg(_namespace,_name,group,channel,criterion,action,path,dittoHeaders,val,status,extra) {if(path.includes('action')== false){let headers=dittoHeaders; let textPayload=JSON.stringify({property: path, value: val}); let bytePayload=null; let contentType='application/vnd.eclipse.ditto+json'; return Ditto.buildExternalMsg(headers,textPayload,bytePayload,contentType);}else {return 0}}

// CMD Schorz
function mapFromDittoProtocolMsg(_namespace,_name,group,channel,criterion,action,path,dittoHeaders,val,status,extra){if(path.includes('action')){let newpath=path.replace('/inbox/messages/action','');let headers=dittoHeaders; let textPayload=JSON.stringify({property: newpath, value: val}); let bytePayload=null; let contentType='application/vnd.eclipse.ditto+json';return Ditto.buildExternalMsg(headers,textPayload,bytePayload,contentType);}else {return 0}}

// NEWTWIN
function mapFromDittoProtocolMsg(_namespace,_name,group,channel,criterion,action,path,dittoHeaders,val,status,extra) {let headers=dittoHeaders; let textPayload=JSON.stringify({namespace: _namespace, device: _name, property: path, value: val,timestamp: Date.now()}); let bytePayload=null; let contentType='application/vnd.eclipse.ditto+json'; return Ditto.buildExternalMsg(headers,textPayload,bytePayload,contentType);}

