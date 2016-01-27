@echo off

rem To enable logging change 'java' into 'java -DSTACKTRACE=true'
java -Djava.awt.headless=true -Xmx256m -Xms64m -XX:MaxPermSize=128m -jar servoy_updater.jar %1 %2 %3 %4 %5 %6 %7 %8 %9
pause

