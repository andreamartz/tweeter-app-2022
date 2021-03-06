<template>
	<q-page class="relative-position">
		<q-scroll-area class="absolute full-width full-height">
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
						@click="addNewTweet"
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
			<q-list separator>
				<transition-group
					appear
					enter-active-class="animated fadeIn slow"
					leave-active-class="animated fadeOut slow"
				>
					<q-item v-for="tweet in tweets" :key="tweet.id" class="q-py-md">
						<q-item-section avatar top>
							<q-avatar>
								<img src="https://cdn.quasar.dev/img/avatar2.jpg" />
							</q-avatar>
						</q-item-section>

						<q-item-section>
							<q-item-label class="text-subtitle1">
								<strong>Jane Doe</strong>
								<span class="text-grey-7">
									@janedoe <br class="lt-md" />
									&bull; {{ getRelativeDate(tweet.date) }}
								</span>
							</q-item-label>
							<q-item-label class="tweet-content text-body1">
								{{ tweet.content }}
							</q-item-label>
							<div class="tweet-icons row justify-between q-mt-sm">
								<q-btn
									flat
									round
									color="grey"
									size="sm"
									icon="far fa-comment"
								/>
								<q-btn
									flat
									round
									color="grey"
									size="sm"
									icon="fas fa-retweet"
								/>
								<q-btn
									@click="toggleLiked(tweet)"
									flat
									round
									:color="tweet.liked ? 'pink' : 'grey'"
									size="sm"
									:icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
								/>
								<q-btn
									@click="deleteTweet(tweet)"
									flat
									round
									color="grey"
									size="sm"
									icon="fas fa-trash"
								/>
							</div>
						</q-item-section>
					</q-item>
				</transition-group>
			</q-list>
		</q-scroll-area>
	</q-page>
</template>

<script>
import db from 'src/boot/firebase';

import { formatDistance } from 'date-fns';

import {
	onSnapshot,
	collection,
	query,
	orderBy,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';

export default {
	name: 'PageHome',
	data() {
		return {
			newTweetContent: '',
			tweets: [
				// {
				// 	id: 'ID1',
				// 	content: "Lorem iBe your own hero; it's cheaper than a movie ticket.",
				// 	date: 1644352412509,
				// 	liked: false,
				// },
				// {
				// 	id: 'ID2',
				// 	content:
				// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat justo id viverra consequat. Integer feugiat lorem faucibus est ornare scelerisque. Donec tempus, nunc vitae semper sagittis, odio magna semper ipsum, et laoreet sapien mauris vitae arcu.',
				// 	date: 1644363080944,
				// 	liked: true,
				// },
			],
		};
	},
	// filters: {
	// 	relativeDate(value) {
	// 		return formatDistance(value, new Date());
	// 	},
	// },
	methods: {
		getRelativeDate(value) {
			return formatDistance(value, new Date());
		},
		async addNewTweet() {
			const tweetCollection = collection(db, 'tweets');
			let newTweet = {
				content: this.newTweetContent,
				date: Date.now(),
				liked: false,
			};
			// // don't use unshift; it mutates the state
			// // this.tweets.unshift(newTweet);
			// const tweets = [newTweet, ...this.tweets];
			// console.log('TWEETS: ', tweets);
			// this.tweets = tweets;

			// Add a new document with a generated id
			try {
				const docRef = await addDoc(tweetCollection, newTweet);
				console.log('Document written with ID: ', docRef.id);
				this.newTweetContent = '';
			} catch (error) {
				console.error(error);
			}
		},
		async toggleLiked(tweet) {
			const tweetRef = doc(db, 'tweets', tweet.id);

			try {
				await updateDoc(tweetRef, {
					liked: !tweet.liked,
				});
				console.log('toggleLiked', tweet);
			} catch (error) {
				console.error('There was an error in updating the document: ', error);
			}
		},
		async deleteTweet(tweet) {
			// let dateToDelete = tweet.date;
			// let index = this.tweets.findIndex((tweet) => tweet.date === dateToDelete);
			try {
				const tweetToDelete = await deleteDoc(doc(db, 'tweets', tweet.id));
			} catch (error) {
				console.error(
					'There was an error removing the document or the document does not exist: ',
					error,
				);
			}
			// // don't use splice; it mutates the state
			// // this.tweets.splice(index, 1);
			// let tweetsBeforeDeleted = [...this.tweets.slice(0, index)];
			// let tweetsAfterDeleted = [...this.tweets.slice(index + 1)];
			// this.tweets = [...tweetsBeforeDeleted, ...tweetsAfterDeleted];
		},
	},

	mounted() {
		const tweetsCollection = collection(db, 'tweets');
		console.log('TWEETS COLLECTION: ', tweetsCollection);
		const tweetsQuery = query(tweetsCollection, orderBy('date'));

		// View changes between snapshots (realtime data sync across devices) and
		// make local state changes
		const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				let tweetChange = change.doc.data();
				tweetChange.id = change.doc.id;
				// fires whenever a new weet is added to the database
				if (change.type === 'added') {
					console.log('New tweet: ', tweetChange);
					let tweets = [tweetChange, ...this.tweets];
					this.tweets = tweets;
				}
				if (change.type === 'modified') {
					let index = this.tweets.findIndex(
						(tweet) => tweet.id === tweetChange.id,
					);
					Object.assign(this.tweets[index], tweetChange);
					console.log('Modified tweet: ', tweetChange);
				}
				if (change.type === 'removed') {
					let index = this.tweets.findIndex(
						(tweet) => tweet.id === tweetChange.id,
					);
					// don't use splice
					// this.tweets.splice(index, 1);
					let tweetsBeforeDeleted = [...this.tweets.slice(0, index)];
					let tweetsAfterDeleted = [...this.tweets.slice(index + 1)];
					this.tweets = [...tweetsBeforeDeleted, ...tweetsAfterDeleted];
					console.log('Removed tweet: ', tweetChange);
				}
			});
		});
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
