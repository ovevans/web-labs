% http://vle-calc.com/
% P = 1 atm = 1.01325 bar
% TEMPERATURE 	x1 (ethanol) 	y1 (ethanol)
% deg C 	mol/mol 	mol/mol
d = [100.441 	0 	0
97.5835 	0.01 	0.11164
95.2475 	0.02 	0.191085
93.3981 	0.03 	0.250545
91.8976 	0.04 	0.296722
89.6158 	0.06 	0.363756
87.9707 	0.08 	0.410054
86.7354 	0.1 	0.443975
84.6893 	0.15 	0.499492
83.4351 	0.2 	0.534207
82.5642 	0.25 	0.559613
81.8956 	0.3 	0.58066
81.3415 	0.35 	0.599826
80.8581 	0.4 	0.618502
80.4235 	0.45 	0.637544
80.0272 	0.5 	0.65754
79.6653 	0.55 	0.678934
79.3377 	0.6 	0.702102
79.0464 	0.65 	0.727396
78.7948 	0.7 	0.755173
78.5876 	0.75 	0.785817
78.4299 	0.8 	0.819759
78.3276 	0.85 	0.857498
78.2876 	0.9 	0.899622
78.2906 	0.92 	0.917853
78.3052 	0.94 	0.936949
78.332 	0.96 	0.956964
78.3501 	0.97 	0.967335
78.3715 	0.98 	0.977959
78.3962 	0.99 	0.988845
78.2929 	1 	1];

T = d(:,1);
x = d(:,2);
y = d(:,3);

n = 8;

xp = linspace(0,.5,1000);

% *** IMPROVE: for getX and getY, only need to fit input data through
% *** max x,y seen in distillation

% *** IMPROVE: for getX2 during distill know direction x,y moving, so
% *** start from last solution to new solution & only from start on reset,
% *** where can also use better method of solution

coef = polyfit(x,y,n)
yp = polyval(coef,xp);
subplot(2,1,1), plot(x,y,'bo',xp,yp,'r'),
title('ethanol in water (every 0.001 in 8th order poly fit)'),
xlabel('x'),ylabel('y')

% % NO DRAMATIC IMPROVEMENT FITTING DIFFERENCE FROM DIAGONAL
% % (y-x) vs. x, and fitting normal from diagonal vs. x same as
% % fitting difference times sqrt(2)/2
% % 
% coef = polyfit(x,y-x,n)
% f = polyval(coef,xp);
% subplot(2,1,2), plot(x,y,'bo',xp,f+xp,'r'),
% title('ethanol in water (every 0.001 in 8th order poly fit)'),
% xlabel('x'),ylabel('y')

coefT = polyfit(x,T,n)
Tp = polyval(coefT,xp);
subplot(2,1,2), plot(x,T,'bo',xp,Tp,'r'), xlabel('x'),ylabel('T (C)')

% for n=8 fit of all points get sum sq error = 9.44e-4 for all points
% for n-8 fit of all points get sum sq error = 8.17e-4 for x=0 to x=0.5 pts
% for n=8 fit of points x=0 to x=0.5, get sum sq error = 0.301e-4

coef = polyfit(x,y,n)
yp = polyval(coef,x(1:16));
sse = sum((y(1:16)-yp).^2)

