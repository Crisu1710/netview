<template>
  <v-app>
    <v-app-bar class="white--text indigo darken-3" app >
      <v-app-bar-nav-icon color="white--text" @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer; text-decoration: none">NetView</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only" >
          <v-btn color="indigo darken-3" v-for="item in menuItems" :key="item.title" :to="item.link" >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer app persistent v-model="sideNav" class="vwdblue text-uppercase" color="indigo darken-2">  <!-- navigation bar -->
      <v-list color="indigo darken-2">  <!-- text color -->
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link" >
          <v-list-item-action>
          <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text">
              {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- <v-footer color="indigo darken-3" fixed class="font-weight-medium" app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Crisu1710</strong>
      </v-col>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'exit_to_app', title: 'Components', link: '/components'},
        { icon: 'mdi-lan', title: 'IPAM', link: '/ips'},
        { icon: 'mdi-heart', title: 'favorits', link: '/'},
      ]
    }
  },
};
</script>
