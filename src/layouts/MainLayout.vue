<template>
	<q-layout view="lHr lpR fFf">
		<q-header bordered class="bg-white text-black">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

				<q-toolbar-title class="text-weight-bold">Tweeter</q-toolbar-title>

				<!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
			</q-toolbar>
		</q-header>

		<q-drawer v-model="left" side="left" :width="283" bordered show-if-above>
			<q-icon name="fas fa-dove" size="lg" color="primary" class="q-pa-md">
			</q-icon>
			<q-list>
				<q-item to="/" clickable v-ripple>
					<q-item-section avatar>
						<q-icon name="home" size="md" />
					</q-item-section>

					<q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
				</q-item>
				<q-item to="/about" clickable v-ripple>
					<q-item-section avatar>
						<q-icon name="help" size="md" />
					</q-item-section>

					<q-item-section class="text-h6 text-weight-bold"
						>About</q-item-section
					>
				</q-item>
			</q-list>
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
