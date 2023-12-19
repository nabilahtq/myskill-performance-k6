import { check, group } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  //Load Test 
  //Target 5 user 5 detik
  // stages: [
  //   {duration: "5s", target: 5}
  // ],

  //Load Test 2
  // stages: [
  //   {duration: "1s", target: 5},
  //   {duration: "5s", target: 5},
  //   {duration: "1s", target: 0}
  // ],

  // //Stress Test
  // stages: [
  //   {duration: "1s", target: 5},
  //   {duration: "5s", target: 5},
  //   {duration: "5s", target: 10},
  //   {duration: "1s", target: 0}
  // ],

  //Spike Test 
  stages: [
    {duration: "1s", target: 5},
    {duration: "5s", target: 5},
    {duration: "3s", target: 25},
    {duration: "5s", target: 5},
    {duration: "1s", target: 0},

  ],
};

export default function () {
  group('K6 Get Test', ()=>{
    let response1 = http.get('http://test.k6.io');
    //console.log("Response 1: " + JSON.stringify(response1.body));
    check( response1, {
        'status was 200': (r) => r.status == 200
      });
  })  
  

  group('Reqres Create User', ()=>{
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
    
    group('Get single user', ()=>{
        let url = 'https://reqres.in/api/users/2';
        let response3 = http.get(url);
        check( response3, {
            'status was 200': (r) => r.status == 200
        });
    })
  }) 

}

export function handleSummary(data) {
    return {
      "script1-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
