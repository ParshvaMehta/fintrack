// generate 6 digit random number
export const generateOTP = () => {
	return Math.floor(100000 + Math.random() * 900000);
};
