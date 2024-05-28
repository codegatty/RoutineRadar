# List of directories
$directories = @("D:\projects\RoutineRadar\backend\user_service", "D:\projects\RoutineRadar\backend\routine_service", "D:\projects\RoutineRadar\backend\roadMap_service")

# Loop through each directory
foreach ($dir in $directories) {
    # Open a new PowerShell window in the directory
    #Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "cd '$dir'"
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "cd '$dir'; npm start"
}