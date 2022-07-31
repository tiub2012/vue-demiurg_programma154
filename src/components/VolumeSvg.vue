<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 36.84 6.05"
	>
		<g id="Layer_1">
			<g>
				<g>
					<polygon
						:style="{fill: isMuted ? 'rgb(155, 81, 81)' : '#d7dbdc'}"
						points="3.92 .36 1.98 1.45 1.25 1.86 1.23 1.86 1.23 4.19 1.25 4.19 1.98 4.6 3.92 5.69 3.92 .36"
					/>
					<path
						:style="{fill: isMuted ? 'rgb(155, 81, 81)' : '#d7dbdc'}"
						d="M1.02,1.86H.2c-.11,0-.2,.07-.2,.16v2c0,.09,.09,.16,.2,.16h.83V1.86Z"
					/>
					<path
						:style="{fill: isMuted ? 'rgb(155, 81, 81)' : '#d7dbdc'}"
						d="M4.53,.02l-.4,.22V5.8l.4,.22c.11,.06,.25-.01,.25-.13V.16c0-.12-.14-.2-.25-.13Z"
					/>
				</g>

				<rect 
					:key="idx" 
					width=".72" 
					height="6.05"  
					class="cls-2"
					:x="x + idx * 1.6" 
					:ref="`rect-${idx}`"
					v-for="(rect, idx) in rects" 
					:style="{
						fill: idx < volume 
							? `rgb(255, ${255 - idx * 12}, ${255 - idx * 12})`
							: `rgb(104, 104, 104)`,
						display: rect ? 'block' : 'none'
					}" 
				/>

			</g>
		</g>
	</svg>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'volume-svg',
	props: {
		volumePercent: Number,
		isMuted: Boolean
	},
	data(){
		return {
			x: 5.66
		}
	},
	computed: {
		...mapGetters(['rects']),
		volume(){
			return (this.rects.length * this.volumePercent) / 100
		}
	}
}
</script>
