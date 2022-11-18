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
    extra) {
    // ###
    // Insert your mapping logic here
    // ### example code using the Ditto protocol content type.
    let headers = dittoHeaders;
    let textPayload = JSON.stringify(Ditto.buildDittoProtocolMsg(namespace, name, group, channel, criterion, action, path, dittoHeaders, value, status, extra));
    let bytePayload = null;
    let contentType = 'application/vnd.eclipse.ditto+json';
//    return Ditto.buildExternalMsg(
//      headers, // The external headers Object containing header values
//      textPayload, // The external mapped String
//      bytePayload, // The external mapped byte[]
//      contentType // The returned Content-Type
//    );
    var pf = "path";
    var pfobj = {};
    pfobj[pf] = path;

    var val = "value";
    var valobj = {};
    valobj[val] = value;

    return JSON.stringify(
        path: path,
        value: value
    );
}