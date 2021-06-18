export interface CalculateDTO {

	unitsMeasure: {
		fat_mass: string;
		lean_mass: string;
		body_mass_index: string;
		body_fat_percentage: string;
	},
	historicCalculations: {
		fat_mass: number;
		lean_mass: number;
		body_mass_index: number;
		body_fat_percentage: number;
		created_at: string;
	}[]

}
