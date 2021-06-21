export interface UserDTO {
	id: string;
	name: string;
	email: string;
	gender: string;
	date_birth?: string;
	token?: string;
	refresh_token?: string;
	access_token?: string;
  }
