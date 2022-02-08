<template>
	<q-page>
		<div class="q-py-lg q-px-md row items-end q-col-gutter-md">
			<div class="col">
				<q-input
					class="new-tweet"
					bottom-slots
					v-model="newTweetContent"
					placeholder="What's happening?"
					counter
					maxlength="280"
					autogrow
				>
					<template v-slot:before>
						<q-avatar size="xl">
							<img src="https://cdn.quasar.dev/img/avatar5.jpg" />
						</q-avatar>
					</template>
				</q-input>
			</div>
			<div class="col col-shrink">
				<q-btn
					class="q-mb-lg"
					:disable="!newTweetContent"
					color="primary"
					label="Tweet"
					unelevated
					rounded
					no-caps
				/>
			</div>
		</div>
		<q-separator class="divider" size="10px" color="grey-2" />
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

<style lang="sass">
.new-tweet textarea[maxLength="280"]
	font-size: 19px
	line-height: 1.4

.divider
	border-top: 1px solid
	border-bottom: 1px solid
	border-color: $grey-4
</style>
