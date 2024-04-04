export const checkApiLimit = async (req, res, next) => {
  try {
    const user = req?.user;
    let requestLimit = 0;
    if (user?.isTrialActive) {
      requestLimit = user.monthlyRequestCount;
    }
    if (user?.apiRequestCount >= requestLimit) {
      throw new Error("Credits Limit Reached, Upgrade Now!");
    }
    next();
  } catch (error) {
    next(error);
  }
};
