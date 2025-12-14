export default {
  dialect: 'sqlite',

  collections: [
    {
      name: 'decisions',
      fieldsFile: './schemas/decisions-schema.json',
      hierarchy: true,
    },
    {
      name: 'options',
      fieldsFile: './schemas/options-schema.json',
    },
    {
      name: 'criteria',
      fieldsFile: './schemas/criteria-schema.json',
    },
    {
      name: 'evaluations',
      fieldsFile: './schemas/evaluations-schema.json',
    },
    {
      name: 'notes',
      fieldsFile: './schemas/notes-schema.json',
    },
  ],

  targets: [
    {
      layer: 'thinkgraph',
      collections: ['decisions', 'options', 'criteria', 'evaluations', 'notes'],
    },
  ],

  flags: {
    useTeamUtility: true,
    useMetadata: true,
    force: true,
  },
}
