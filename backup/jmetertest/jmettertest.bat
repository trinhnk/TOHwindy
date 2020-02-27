E:
cd apache-jmeter-5.2.1/bin
RD /S /Q "E://HTMLReport"
del /f "E://test.csv"
jmeter.bat -n -t E://Test.jmx -l E://test.csv -e -o E://HTMLReport
pause;