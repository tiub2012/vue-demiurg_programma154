<template>
	<div class="scena">
		<img src="@/assets/images/magya1.png" alt="" class="magia-text-img" />
		<div class="menu-text-1">ТЕХНОЛОГИЯ</div>
		<img src="@/assets/images/demiurg.png" alt="" title="" class="flag-img" />
		<div class="text-block-6">
			Просмотр необходимо производить в наушниках. <br />
			<strong class="bold-text aeb">Это важно!</strong>
		</div>

		<app-video />

	</div>
</template>

<script>
export default {
	name: 'scena',
	mounted(){window.scrollTo(0, 0)}
}
</script>
