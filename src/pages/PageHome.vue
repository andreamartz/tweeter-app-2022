<template>
	<q-page>
		<div class="q-py-lg q-px-md">
			<q-input
				bottom-slots
				v-model="newTweetContent"
				placeholder="What's happening?"
				counter
				maxlength="280"
			>
				<template v-slot:before>
					<q-avatar size="xl">
						<img src="https://cdn.quasar.dev/img/avatar5.jpg" />
					</q-avatar>
				</template>

				<template v-slot:after>
					<q-btn
						:disable="!newTweetContent"
						color="primary"
						label="Tweet"
						unelevated
						rounded
						no-caps
					/>
				</template>
			</q-input>
		</div>
	</q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default {
	name: 'PageHome',
	data() {
		return {
			newTweetContent: '',
		};
	},
};
</script>
