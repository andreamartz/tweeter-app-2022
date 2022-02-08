<template>
	<q-layout view="lHr lpR fFf">
		<q-header bordered class="bg-white text-black">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

				<q-toolbar-title class="text-weight-bold">Tweeter</q-toolbar-title>

				<!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
			</q-toolbar>
		</q-header>

		<q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
			<!-- drawer content -->
		</q-drawer>

		<q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
			<!-- drawer content -->
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
	data() {
		return {
			left: false,
			right: false,
		};
	},
};
</script>
