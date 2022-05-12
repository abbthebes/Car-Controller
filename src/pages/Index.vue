<template>
  <q-page class="bg-primary" >
    
    
  </q-page>
</template>

<script>
import { client } from "../boot/mqtt-boot";
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
  data() {
    return {
      receivedMessage: "",
      publishMessage: "",
      chatMessages: [],
    };
  },
  methods: {
    publish() {
      // for(let i = 0; i < 300; i++){
      
      client.publish("thebes", i.toString());
      // }
      
    },
  },
};
</script>
