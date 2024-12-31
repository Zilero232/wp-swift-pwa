export enum NotificationSeverity {
	ERROR = 'error',
	INFO = 'info',
	SUCCESS = 'success',
	WARNING = 'warning',
}

export interface NotificationInterface {
	message: string;
	severity: NotificationSeverity;
}
