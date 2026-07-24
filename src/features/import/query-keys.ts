export const importKeys = {
  detail: (importId: string) => ['imports', 'detail', importId] as const,
  intakeDefinition: (importId: string) => ['imports', importId, 'intake-definition'] as const,
}
