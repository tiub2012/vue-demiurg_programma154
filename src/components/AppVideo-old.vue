<template>
  <div class="video-wrapper"
    @mouseover="onVideoOver" 
    @mouseleave="onVideoLeave"
		>
		<div class="top-video">
			<video-play-btn @click="$refs.video.play()" v-if="!isPlay"/>

			<video :poster="require(`@/assets/images/${idx}bg.jpg`)" ref="video">
				<source :src="data[idx].link" type="video/mp4">
			</video>

			<div class="control" :class="{active: isOver}">
				<div class="compress">
					<font-awesome-icon icon="compress" v-if="fullscreen" @click="fullscreenVideo"/>
					<font-awesome-icon icon="expand" v-else @click="fullscreenVideo"/>
				</div>
				<div class="scale" ref="scale" 
					@mouseover="onMouseover"
					@mouseleave="onMouseleave"
					@mousemove="onMousemove($event)"
					@click="rewind($event)">
					<div class="fill" :style="{width: `${progress}%`}">
						<div class="fill-scale-info-block" :style="{left: info_block_left, display: info_block_view}">
							<div class="scale-info-block">{{passed_info}}</div>
							<div class="scale-info-triangle"></div>
						</div>
					</div>
				</div>
				<div class="bar">
					<div class="left-bar">
						<font-awesome-icon icon="pause" v-if="isPlay" @click="pause"/>
						<font-awesome-icon icon="play" v-else @click="play"/>
					</div>
					<div class="right-bar">
						<div class="kolonka">
							<font-awesome-icon icon="volume-off" v-if="isMuted" @click="mute"/>
							<font-awesome-icon icon="volume-mute" v-else @click="mute"/>
						</div>
						<div class="volume">
							<input type="range" min="0" max="100" value="30" @input="volume($event)">
						</div>
						<div class="remained">{{ useTime(current, duration) }} / {{ useTime(duration, duration) }}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bottom-video">
			<practic-btn @click="$router.push(`/`)" :class="{'left-btn': data[idx]?.practic}">В главное меню</practic-btn>
			<practic-btn @click="$router.push(`/practic`)" :class="{'right-btn': data[idx]?.practic}" v-if="data[idx]?.practic">Практика</practic-btn>
		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-video',
  data() {
		return {
			isMuted: false,
			fullscreen: false,
			isPlay: false,
			progress: 0,
			duration: 0,
			current: 0,
			isOver: false,
			info_block_left: '',
      info_block_view: 'none',
			passed_info: ''
		}
	},
  computed: {
		...mapState({
      data: (state) => state.data,
      idx: (state) => state.idx,
    }),
	},
  methods: {
		onMouseover(){
      if(document.documentElement.clientWidth > 800){
        this.info_block_view = 'block'
      }
    },
    onMouseleave(){
      this.info_block_view = 'none'
    },
    onMousemove(e){
      const width = parseInt(getComputedStyle(this.$refs.scale).width)
      const passed = e.offsetX + 1
      const persent = 100 * passed / width
      const progress = this.duration / 100 * persent
      this.info_block_left = `${e.offsetX - 20}px`
      this.passed_info = this.useTime(progress, progress)
    },
		onVideoOver(){
			this.isOver = true
		},
		onVideoLeave(){
			this.isOver = false
		},
		play(){
			this.$refs.video.play()
			this.isPlay = true
			this.isPlay2 = true
		},
		pause(){
			this.$refs.video.pause()
			this.isPlay = false
		},
		volume(e){
			const v = e.target.value
			this.$refs.video.volume = v / 100
		},
		mute(){
			this.isMuted = !this.isMuted
			this.$refs.video.muted = this.isMuted
		},
		progressUpdate(){
			this.current = this.$refs.video.currentTime
			this.progress = 100 * this.current / this.duration
		},
		rewind(e){
			const width = parseInt(getComputedStyle(this.$refs.scale).width)
			const passed = e.offsetX
			this.progress = 100 * passed / width
			this.$refs.video.pause()
			this.$refs.video.currentTime = this.duration * ( passed / width )
			if(this.isPlay){
				this.play()
			}
		},
		fullscreenVideo(){
			this.$refs.video.requestFullscreen()
		},
		useTime(t, d){
			const digit = n => n < 10 ? `0${n}` : `${n}`
			const sec = digit(Math.floor(t % 60))
			const min = digit(Math.floor((t / 60) % 60))
			const hr = digit(Math.floor(t / 3600) % 60)

			if (d < 3600) {
				return min + ':' + sec
			} else {
				return hr + ':' + min + ':' + sec
			}
		}
	},
	mounted() {
		this.$refs.video.ontimeupdate = () => this.progressUpdate()
		this.$refs.video.onloadedmetadata = () => {
			this.duration = this.$refs.video.duration
		}
		this.$refs.video.onended = () => {
			this.progress = 0
			this.currentTime = 0
		}
		this.$refs.video.onplay = () => {
			this.isPlay = true
			this.isPlay2 = true
		}
	},
}
</script>

<style>

</style>