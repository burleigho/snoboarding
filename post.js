const FormData = require('form-data');
const fs = require('fs');
const appRoot = require('app-root-path');
const request = require('request');

let form = new FormData();

const formData = {
  // Pass a simple key-value pair
  my_field: 'my_value',
  // Pass data via Buffers
  my_buffer: Buffer.from([1, 2, 3]),
  // Pass data via Streams
  my_file: fs.createReadStream(`${appRoot}/public/uploads/upload_6cb096c152e7f9f183677b30f1221fbc.csv`),
  // Pass multiple values /w an Array
  // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
  // Use case: for some types of streams, you'll need to provide "file"-related information manually.
  // See the `form-data` README for more information about options: https://github.com/form-data/form-data
};
request.post({
  url: 'https://dev61659.service-now.com/sys_import.do?sysparm_import_set_tablename=u_imp_olitest&sysparm_transform_after_load=false',
  formData: formData,
  auth: {
    username: 'admin',
    password: 'Amelie14!'
  }
}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', httpResponse);
});