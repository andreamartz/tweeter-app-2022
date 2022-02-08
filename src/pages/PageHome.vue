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
		<q-list>
			<q-item class="q-py-md">
				<q-item-section avatar top>
					<q-avatar>
						<img src="https://cdn.quasar.dev/img/avatar2.jpg" />
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label class="text-subtitle1">
						<strong>Jane Doe</strong>
						<span class="text-grey-7"> @janedoe </span>
					</q-item-label>
					<q-item-label class="tweet-content text-body1">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
						reprehenderit voluptatem consectetur magnam enim repellat odit,
						animi dolore minus sed ipsa veniam! Tempore cumque est dolorem quis
						itaque sapiente exercitationem.
					</q-item-label>
					<div class="tweet-icons row justify-between q-mt-sm">
						<q-btn flat round color="grey" size="sm" icon="far fa-comment" />
						<q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
						<q-btn flat round color="grey" size="sm" icon="far fa-heart" />
						<q-btn flat round color="grey" size="sm" icon="fas fa-trash" />
					</div>
				</q-item-section>

				<q-item-section side top> 1 min ago </q-item-section>
			</q-item>
		</q-list>
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

.tweet-content
	white-space: pre-line

.tweet-icons
	margin-left: -5px
</style>
