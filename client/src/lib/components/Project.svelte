<script lang="ts">
	import type { Project, Skill as SkillModel } from 'portfolio-api/models/database';
	import Skill from './Skill.svelte';
	export let project: Project;
	export let experienceId: String;

	const castSkill = (skill: unknown) => {
		return skill as SkillModel;
	};
</script>

<div class="block card card-hover variant-ghost-secondary p-2 m-1">
	<article>
		<h3 id={`${project.name}_${experienceId}`}>{project.name}</h3>
		<h4 data-toc-ignore>{project.start} - {project.end}</h4>
		<p>{project.summary}</p>

		<div>
			{#each project.hardSkills as hardSkill}
				<Skill skill={castSkill(hardSkill.skill)} level={hardSkill.level || -1} />
			{/each}
			{#each project.softSkills as softSkill}
				<Skill skill={castSkill(softSkill.skill)} level={softSkill.level || -1} />
			{/each}
		</div>
	</article>
</div>
