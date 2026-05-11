[Feature]
- Multistage Login
[Invariant]
- An application may assume that a user who accesses stage three must have cleared stages one and two
- An application may assume that the same user identity is used to complete each stage
- You can't edit the values between the stages
- You can't enter until complete all the stages for a specific identity
[Break]
- Order: go to stage 3 without stage 1,2
- Tamper: Edit the values between stage 1,2
- Identity mix: use different users cred at different stages
- Workflow abuse: make each stage with different users
[Steps]
1. Perform a complete, valid login using an account you control. Record every piece of data submitted to the application using your intercepting proxy. 
2. Repeat the login process numerous times with various malformed requests:
	a. Try performing the login steps in a different sequence.
	b. Try proceeding directly to any given stage and continuing from there.
	c. Try skipping each stage and continuing with the next.
	d. Use your imagination to think of other ways to access the different stages that the developers may not have anticipated.
3. If any data is submitted more than once, try submitting a different value at different stages
4. Pay close attention to any data being transmitted via the client that was not directly entered by the user (Edit the values between the stages) For example, if the request for stage three includes the parameter stage2complete=true, it may be possible to advance straight to stage three by setting this value. Try to  modify the values being submitted, and determine whether this enables you to advance or skip stages.
