#!/bin/bash

RC=0

ng test --browsers ChromeHeadless --watch false
if [[ $? -ne 0 ]]; then RC=1; fi

exit $RC
