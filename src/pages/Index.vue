<template>
  <q-page class="bg-secondary" >
        <q-tabs no-caps active-color="accent" indicator-color="transparent" class="text-primary" v-model="tab">
          <q-tab name="Controller" label="Controller" class="underline" id="Controller"/>
          <q-tab name="Panel" label="Panel" class="underline" id="Panel"/>
          <q-tab name="Programs" label="Programs" class="underline" id="Programs"/>
        </q-tabs>


        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="Controller" style="height:92vh" class="bg-primary"  @mousemove="joymove" @mouseup="joyreleased">
            <div class="absolute bg-secondary fixed-center" style="height:200px;width:200px; border-radius:100px;" @mousemove="joymove" @mousedown="joyclicked" @mouseup="joyreleased"></div>
            <div class="absolute bg-accent fixed-center" style="height:100px;width:100px; border-radius:50px;" id="joymiddle" @mousemove="joymove" @mousedown="joyclicked" @mouseup="joyreleased"></div>
            
            
          </q-tab-panel>

          <q-tab-panel name="Panel" style="height:92vh" class="bg-primary">
            <!-- <div class="h-screen w-screen">
              
              <canvas id="canvas" name="game"></canvas>
            </div> -->
          </q-tab-panel>

          <q-tab-panel name="Programs" style="height:92vh" class="bg-primary">
            
          </q-tab-panel>
        </q-tab-panels>
  </q-page>
</template>

<script>
import { client } from "../boot/mqtt-boot";
import { mapState, mapActions } from 'pinia'
import {useCounterStore} from '../store/counter'
export default {
  created() {
    client.on("connect", () => {
      console.log("Conntected!");
      client.subscribe("thebes", function (err) {
        if (!err) {
          let info = JSON.stringify({
            user: "Theodor",
            message: "Hello mqtt",
          });
          client.publish("thebes", info);
          // client.publish("thebes", info);
        }
      });
    });

    client.on("message", (topic, message) => {
      // console.log(`${topic} - ${message.toString()}`);
      // let info = JSON.parse(message.toString());
      // // this.chatMessages.push(info);
    });
  },
  mounted(){
    // var joymid = document.getElementById("joymiddle");
    // joymid.style.top = this.$q.screen.height/2-50 + "px";
    // joymid.style.left = this.$q.screen.width/2 + "px";
  },
  data() {
    return {
      receivedMessage: "",
      publishMessage: "",
      chatMessages: [],
      tab: "Controller",
      joyclicking: false
    };
  },
  // computed: {
  //   ...mapState(useCounterStore, {counter: "counter"})
  // },
  methods: {
    ...mapActions(useCounterStore, ["increment", "decrement"]),
    publish() {
      // for(let i = 0; i < 300; i++){
      // i.toString()
      client.publish("thebes", "2");
      // }
      
    },
    async joyreleased() {
      this.joyclicking = false;
      var joymid = document.getElementById("joymiddle");
      var counter = 1;
      // while(true){
      //   counter++;
      //   if(counter != 100000000) continue;
      //   counter = 0;
      //   let lerpto = lerp([parseInt(joymid.style.top.substring(0, joymid.style.top.length-2)), parseInt(joymid.style.left.substring(0, joymid.style.left.length-2))], [this.$q.screen.height/2-25, this.$q.screen.width/2], 0.1);
      //   console.log(lerpto[0]);
      //   console.log(lerpto[1]);
      //   joymid.style.top = lerpto[0] + "px";
      //   joymid.style.left = lerpto[1] + "px";
      //   if(Math.abs(this.$q.screen.height/2-25 - lerpto[0]) < 10 && Math.abs(this.$q.screen.width/2 - lerpto[1]) < 3) break; 
      // }
    },
    joyclicked() {
      this.joyclicking = true;
    },
    joymove(e) {
      console.log();
      if(this.joyclicking){
        var multiplier = in_circle(e, this.$q.screen.width, this.$q.screen.height)
        
        var joymid = document.getElementById("joymiddle");
        joymid.style.top = (e.clientY-this.$q.screen.height/2)*multiplier-25+this.$q.screen.height/2 + "px";
        joymid.style.left = (e.clientX-this.$q.screen.width/2)*multiplier+this.$q.screen.width/2 + "px";
      } else {
        var joymid = document.getElementById("joymiddle");
        
        let lerpto = lerp([parseInt(joymid.style.top.substring(0, joymid.style.top.length-2)), parseInt(joymid.style.left.substring(0, joymid.style.left.length-2))], [this.$q.screen.height/2-25, this.$q.screen.width/2], 0.1);
        console.log(parseInt(joymid.style.top.substring(0, joymid.style.top.length-2)));
        joymid.style.top = lerpto[0] + "px";
        joymid.style.left = lerpto[1] + "px";
      }
    },
    
  },
};

function in_circle(e, w, h) {
    var radius = 90
    var current_radius = Math.sqrt(Math.pow(e.clientX - (w)/2, 2) + Math.pow(e.clientY - (h)/2, 2));
    if (radius >= current_radius) return 1
    else return radius / current_radius;
}
function lerp(a, b, t) {
  var len = a.length;
  if(b.length != len) return;

  var x = [];
  for(var i = 0; i < len; i++)
      x.push(a[i] + t * (b[i] - a[i]));
  return x;
}
</script>


<style scoped>

  .underline {
  position: relative;
  color: #000000;
  text-decoration: none;
}

.underline:focus {
  color: #000000;
}
.underline::before {
  content: "";
  position: absolute;
  display: block;
  width: 80%;
  height: 2.5px;
  bottom: 5px;
  left: 10%;
  background-color: #0aaab0;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.underline:hover::before {
  transform: scaleX(1);
}
</style>

