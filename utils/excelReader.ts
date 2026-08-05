import * as XLSX from 'xlsx';

export type ChallengeRow = {
  ein: string;
  companyName: string;
  sector: string;
  address: string;
  automationTool: string;
  annualSaving: string;
  date: string;
};

const HEADER_TO_KEY: Record<string, keyof ChallengeRow> = {
  employer_identification_number: 'ein',
  company_name: 'companyName',
  sector: 'sector',
  company_address: 'address',
  automation_tool: 'automationTool',
  annual_automation_saving: 'annualSaving',
  date_of_first_project: 'date',
};

export function readChallengeRows(filePath: string): ChallengeRow[] {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: '' });

  return rawRows.map((raw) => {
    const row = {} as ChallengeRow;
    for (const [header, key] of Object.entries(HEADER_TO_KEY)) {
      row[key] = String(raw[header] ?? '');
    }
    return row;
  });
}