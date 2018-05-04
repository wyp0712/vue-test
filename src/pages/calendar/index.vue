<template>
  <div class="calendar-container">
      <table>
         <thead>
            <tr>
              <td>
                1
              </td>
               <td>
                1
              </td>
               <td>
                1
              </td>
               <td>
                1
              </td>
               <td>
                1
              </td>
               <td>
                1
              </td>
               <td>
                1
              </td>
            </tr>
         </thead>
      </table>
      <div id="container"></div>
  </div>
</template>
<script>
let fly = require('./fline.js');
console.log(fly.flyline)

  export default {
    name: 'calendarContainer',
    data() {
      return {

      }
    },
    created(){}
  }
</script>
