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
				<div class="scale">
					<div class="fill" :style="{width: `${progress}%`}">

						<div class="fill-circle">
							<div class="inner-fill-circle"></div>
						</div>

						<div class="fill-scale-info-block" 
							:style="{left: info_block_left, display: info_block_view}"
						>
							<div class="scale-info-block">{{passed_info}}</div>
							<div class="scale-info-triangle"></div>
						</div>
					</div>

					<div 
						ref="scale"
						class="hide-fill" 
						@mouseover="onMouseover"
						@mouseleave="onMouseleave"
						@mousemove="onMousemove($event)"
						@click="rewind($event)"
					></div>
				</div>
				<div class="bar">
					<div class="left-bar">
						<div class="play-pause-button-block">
							<div class="inner-play-pause-button-block" v-if="isPlay" @click="pause">
								<font-awesome-icon icon="pause"/>
							</div>
							<div class="inner-play-pause-button-block" v-else @click="play">
								<font-awesome-icon icon="play"/>
							</div>
						</div>
						<div class="volume-block">
							<volume-svg 
								class="volume-png"
								:isMuted="isMuted"
								:volumePercent="volumePercent"
							/>
							<div
								class="volume-cover"
								@mouseenter="showVolume"
								@mouseleave="hideVolume"
							>
								<div
									@click="mute"
									class="inner-volume-cover-left"
								>
									<div class="slash" v-if="isMuted"></div>
								</div>
								<div 
									ref="volume"
									@click="onVolume($event)"
									:class="{'deactive': deactive}"
									class="inner-volume-cover-right"
								></div>
							</div>
						</div>
					</div>
					<div class="right-bar">
						<div class="time-block">
							<div class="inner-time-block">
								{{ useTime(current, duration) }} / {{ useTime(duration, duration) }}
							</div>
						</div>
						<div class="fullscreen-block">
							<div class="inner-fullscreen-block" @click="fullscreenVideo">
								<font-awesome-icon icon="fa-expand"/>
							</div>
						</div>
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import VolumeSvg from './VolumeSvg.vue'

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
			passed_info: '',
			deactive: true,
			volumePercent: 30,
			tempVolumePercent: 30
		}
	},
  computed: {
		...mapState({
      data: (state) => state.data,
      idx: (state) => state.idx,
    }),
		...mapGetters(['rects'])
	},
  methods: {
		...mapMutations(['setItemRects']),
		showVolume(){
			this.deactive = false
			this.rects.forEach((_, idx) => {
				setTimeout(() => {
					this.setItemRects([idx, true])
				}, 10 * idx)
			})
		},
		hideVolume(){
			this.deactive = true
			this.rects.forEach((_, idx) => {
				setTimeout(() => {
					this.setItemRects([idx, false])
				}, 10 * idx)
			})
		},
		onVolume(e){
			const width = parseInt(getComputedStyle(this.$refs.volume).width)
			const passed = e.offsetX
			this.volumePercent = this.tempVolumePercent = 100 * passed / width
			this.$refs.video.volume = this.volumePercent / 100
			if(this.isMuted){
				this.isMuted = false
				this.$refs.video.muted = false
			}
		},
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
      const percent = 100 * passed / width
      const progress = this.duration / 100 * percent
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
		},
		pause(){
			this.$refs.video.pause()
			this.isPlay = false
		},
		mute(){
			this.isMuted = !this.isMuted
			if(this.isMuted){
				this.volumePercent = 0
			} else {
				this.volumePercent = this.tempVolumePercent
			}
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
			this.isPlay = false
		}
		this.$refs.video.onplay = () => this.isPlay = true
	},
	components: {
		VolumeSvg
	}
}
</script>