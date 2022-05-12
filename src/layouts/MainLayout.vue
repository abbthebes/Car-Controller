<template>
  <q-layout view="lHh Lpr lFf">
    <div class="bg-primary">
      <q-header bordered class="bg-secondary text-primary row justify-center">
        <q-tabs no-caps active-color="accent" indicator-color="transparent" class="text-primary" v-model="tab">
          <q-tab name="Controller" label="Controller" class="underline" id="Controller"/>
          <q-tab name="Panel" label="Panel" class="underline" id="Panel"/>
          <q-tab name="Programs" label="Programs" class="underline" id="Programs"/>
        </q-tabs>
        <div class="text-primary absolute-right" style="top:5px; right: 5px">
        <q-btn-toggle
          v-model="model"
          push
          glossy
          color="secondary"
          toggle-color="accent"
          :options="[
            {label: 'Dark', value: 'Dark'},
            {label: 'Light', value: 'Light'}
          ]"
        />
      </div>
      </q-header>
      
      <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-list>
          <q-item-label header> Essential Links </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer> -->

      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";



import { ref } from "vue";

export default {
  name: "MainLayout",
  setup() {
    return {
      tab: ref('Controller'),
      model: ref('Dark')
    };
  },
  watch: {
    model: function(model) {
      console.log(model);
      // fixa senare
    },
    tab: function(tab) {
      console.log(tab);
      // var element1 = document.getElementById("Controller");
      // var element2 = document.getElementById("Panel");
      // var element3 = document.getElementById("Programs");
      // element1.classList.remove("underline");
      // element2.classList.remove("underline");
      // element3.classList.remove("underline");
      // if(tab == "Controller") element1.className += "underline";
      // if(tab == "Panel") element2.className += "underline";
      // if(tab == "Programs") element3.className += "underline";
    }
  }

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

// https://vuejsexamples.com/tag/animation/