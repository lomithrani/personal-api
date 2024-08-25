<script lang="ts">
	import type { Skill } from 'portfolio-api/models/database';
	export let skill: Skill;
	export let level: number;
</script>

<span class="chip variant-filled-primary">
	{skill.displayName}
</span>
