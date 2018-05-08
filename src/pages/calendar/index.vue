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
  import shanghai from '../three/shanghai.json'

  const turf = require('@turf/turf')
  var center = turf.centroid(shanghai).geometry.coordinates
  const THREE = window.THREE;
  console.log(three, 'THREE')
  export default {
    name: 'calendarContainer',
    data() {
      return {

      }
    },
    created(){}
  }
</script>
