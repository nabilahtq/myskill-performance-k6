import { check } from 'k6';
import http from 'k6/http';

export default function () {
  let response1 = http.get('http://test.k6.io');
  //console.log("Response 1: " + JSON.stringify(response1.body));
  check( response1, {
    'status was 200': (r) => r.status == 200
  });

  let url = 'https://reqres.in/api/users';
  let body = JSON.stringify({
    "name": "morpheus3",
    "job": "leader3"
  });
  let response2 = http.post(url, body);
  console.log("Response 2: " + JSON.stringify(response2.body)); //untuk melihat response body
  check( response2, {
    'status was 201': (r) => r.status == 201
  });
}
