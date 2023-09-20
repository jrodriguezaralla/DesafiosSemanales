import { DateTime } from 'luxon';

export function isAdminOrPremium(req, res, next) {
	const dateTime = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
	if (req.user.role === 'admin' || req.user.role === 'premium') {
		req.logger.info(`${dateTime} - Admin/Premium Access ${req.user.first_name} ${req.user.last_name} ${req.user.email}`);
		next();
	} else {
		res.status(403).send({ status: 'error', message: 'access denied, you do not have permission to be here' });
	}
}
