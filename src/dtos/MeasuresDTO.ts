export interface MeasuresTDO {
	unitsMeasure: {
		height: string;
		weight: string;
		waist: string;
		neck: string;
	},
	historicMeasures:
	{
		height: number;
		weight: number;
		waist: number;
		neck: number;
		created_at: string;
	}[]
}
