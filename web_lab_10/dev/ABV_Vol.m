% Alcohol by volume (ABV) is vol of pure alcohol used to make mixture divided 
% by volume of mixture after mixing, which is reduced from sum of volumes
% of water and ethanol used because of nonideal mixing.
% ABV is proportional to specific gravity of mixture as measured
% by a hydrometer in ethanol-water mixure.

% Reference http://www.ddbst.com/en/EED/VE/VE0%20Ethanol%3BWater.php
% Excess Volume Data Set 947
% Components
% No. 	Formula 	Molar Mass 	CAS Registry Number 	Name
% 1 	C2H6O 	46.069 	64-17-5 	Ethanol
% 2 	H2O 	18.015 	7732-18-5 	Water
% Source
% Ott J.B.; Sipowska J.T.; Gruszkiewicz M.S.; Woolley A.T.: 
% Excess Volumes for (Ethanol + Water) at the Temperatures (298.15 and 348.15) K 
% and Pressures (0.4, 5, and 15) MPa and at the Temperature 323.15 K and 
% Pressures (5 and 15) MPa. 
% J.Chem.Thermodyn. 25 (1993) 307-318
% Temperature 	298.150 	K
% Pressure 	5.000 	bar
% Data Table
% Excess Volume [cm3/mol] 	x1 [mol/mol]

% close all
clear all
clc

d = [0 0
    0 0
    0 0
    0 0
    0 0
    0 0
-0.0600 	0.01610
-0.0830 	0.02170
-0.1410 	0.03340
-0.2040 	0.04560
-0.2720 	0.05850
-0.3420 	0.07200
-0.4220 	0.08630
-0.4990 	0.10150
-0.5750 	0.11740
-0.7470 	0.16180
-0.8770 	0.21370
-0.9550 	0.26190
-1.0080 	0.31780
-1.0370 	0.36580
-1.0430 	0.40120
-1.0400 	0.46060
-1.0230 	0.50500
-0.9910 	0.55400
-0.9360 	0.60820
-0.8650 	0.66870
-0.8110 	0.70160
-0.7550 	0.73650
-0.5920 	0.81300
-0.4850 	0.85510
-0.3520 	0.90010
-0.1910 	0.94820
0 1
0 1
0 1
0 1
0 1
0 1];

exvol = d(:,1);
x = d(:,2);

% component 1 is ethanol
mw1 = 46.069; % molecular weight
mvol1 = 58.4; % cm3/mol
dens1 = 0.789; % molecular weight
mpL1 = 17.123; % mol per liter

% component 2 is water
mw2 = 18.015; % molecular weight
mvol2 = 18; % cm3/mol
dens2 = 1; % molecular weight
mpL2 = 55.555; % mol per liter

% fit excess vol
n = 6;
coef = polyfit(x,exvol,n);
yp = polyval(coef,x);
figure(1)
plot(x,exvol,'bo',x,yp,'r')
title('excess vol (cm3/mol) vs. x')

ev0 = polyval(coef,0) % 5e-4 for n = 8, 7e-2 for n = 6
ev1 = polyval(coef,1) % -2e-4 for n = 8, -1e-3 for n = 6

% given total moles and x, find total volume

x = 0.5;
m = 100;
% deltaV = polyval(coef,x); % cm3 per total mol
% v1 = m*x*mvol1/1000 % liters alcohol = mol * cm3/mol / (cm3/liter)
% v2 = m*(1-x)*mvol2/1000 % liters water = mol * cm3/mol / (cm3/liter)
% vol = v1+v2; % total vol before correction
% vol = vol + m * deltaV / 1000 % liters = mol * cm3/mol / (cm3/liter)

vol = ABV_Vol_f1(m,x);

% given total vol and % ABV find total moles and x
% use existing function to find x given ABV
% so start here knowing total vol, ABV, x FIND total moles

clc
vol = 1000 % liters
abv = 50 % percent ethanol
x = getXfromABV(abv);
v1 = abv/100 * vol; % approx vol 1
m1 = mpL1 * v1 % approx liters 1 = mol/L * L
m2 = mpL2 * (vol - v1);
m = m1 + m2 % approx total moles
% so now have total vol, x and initial guess of total moles
% can iterate with function above to find actual total moles 
% use crude method for now 
% at most a 6% difference between simple mixing and use of excess vol
% = 100% * 1.1/18 for water, so start 10% low
m = m - 0.9*m;
minc = 0.001*m;
volest = 0; % so enter repeat
while volest < vol
    m = m + minc;
    volest = ABV_Vol_f1(m,x);
end
m


