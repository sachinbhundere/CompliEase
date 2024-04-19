import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { EventService } from 'src/app/demo/service/event.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {
    example: string;
    constructor(private router: Router, private http: HttpClient, private events: EventService) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as { example: string };
        this.example = state.example;
    }

    selectedCategory: any = null;
    selectedCategories: any[] = [];

    leftDisabled: boolean = true;
    rightDisabled: boolean = false;
    qIndex: number = 0;
    answers: Array<any>;;
    Questions: any[] = null;
    //add questions based on the card heading in following json array
    categories: any[] = [
        {
            "card": "Access",
            "questions": [
                {
                    "question": "Are access rights and privileges of account users periodically being audited?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1" },
                        { "name": "No", "key": "B", "ID": "2" },
                        { "name": "Partially", "key": "C", "ID": "3" },
                        { "name": "I don't know", "key": "D", "ID": "4" }
                    ]
                },
                {
                    "question": "Are there adjustments to users' access rights and privileges upon role changes or hiring?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "5" },
                        { "name": "No", "key": "B", "ID": "6" },
                        { "name": "Partially", "key": "C", "ID": "7" },
                        { "name": "I don't know", "key": "D", "ID": "8" }
                    ]
                },
                {
                    "question": "Are user accounts access privileges defined according to the user's role?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "9" },
                        { "name": "No", "key": "B", "ID": "10" },
                        { "name": "Partially", "key": "C", "ID": "11" },
                        { "name": "I don't know", "key": "D", "ID": "12" }
                    ]
                },
                {
                    "question": "Do all high-privilege users (i.e. administrators) have different passwords for their roles as admins and their roles as 'regular' system users?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "13" },
                        { "name": "No", "key": "B", "ID": "14" },
                        { "name": "Partially", "key": "C", "ID": "15" },
                        { "name": "I don't know", "key": "D", "ID": "16" }
                    ]
                },
                {
                    "question": "Do you enforce a Multi-Factor Authentication for all administrator accounts?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "17" },
                        { "name": "No", "key": "B", "ID": "18" },
                        { "name": "Partially", "key": "C", "ID": "19" },
                        { "name": "I don't know", "key": "D", "ID": "20" }
                    ]
                },
                {
                    "question": "Do you enforce a Multi-Factor Authentication for all company assets and services accessible from outside company network?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "21" },
                        { "name": "No", "key": "B", "ID": "22" },
                        { "name": "Partially", "key": "C", "ID": "23" },
                        { "name": "I don't know", "key": "D", "ID": "24" }
                    ]
                },
                {
                    "question": "Do you log and monitor sensitive assets?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "25" },
                        { "name": "No", "key": "B", "ID": "26" },
                        { "name": "Partially", "key": "C", "ID": "27" },
                        { "name": "I don't know", "key": "D", "ID": "28" }
                    ]
                },
                {
                    "question": "Do you maintain an up-to-date inventory of service accounts?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "29" },
                        { "name": "No", "key": "B", "ID": "30" },
                        { "name": "Partially", "key": "C", "ID": "31" },
                        { "name": "I don't know", "key": "D", "ID": "32" }
                    ]
                },
                {
                    "question": "Do you provide privacy and security notices for users when logging into the organization's system?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "33" },
                        { "name": "No", "key": "B", "ID": "34" },
                        { "name": "Partially", "key": "C", "ID": "35" },
                        { "name": "I don't know", "key": "D", "ID": "36" }
                    ]
                },
                {
                    "question": "Do you use a centralized authentication and authorization management system?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "37" },
                        { "name": "No", "key": "B", "ID": "38" },
                        { "name": "Partially", "key": "C", "ID": "39" },
                        { "name": "I don't know", "key": "D", "ID": "40" }
                    ]
                },
                {
                    "question": "Do you use a Single Sign-on service to access company systems and applications containing sensitive data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "41" },
                        { "name": "No", "key": "B", "ID": "42" },
                        { "name": "Partially", "key": "C", "ID": "43" },
                        { "name": "I don't know", "key": "D", "ID": "44" }
                    ]
                },
                {
                    "question": "Does the company prevent the reuse of account identifiers for a defined period?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "45" },
                        { "name": "No", "key": "B", "ID": "46" },
                        { "name": "Partially", "key": "C", "ID": "47" },
                        { "name": "I don't know", "key": "D", "ID": "48" }
                    ]
                },
                {
                    "question": "Does the company use only secured protocols for account access authentication?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "49" },
                        { "name": "No", "key": "B", "ID": "50" },
                        { "name": "Partially", "key": "C", "ID": "51" },
                        { "name": "I don't know", "key": "D", "ID": "52" }
                    ]
                },
                {
                    "question": "Does the organization assign individual user identification before granting system and service access?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "53" },
                        { "name": "No", "key": "B", "ID": "54" },
                        { "name": "Partially", "key": "C", "ID": "55" },
                        { "name": "I don't know", "key": "D", "ID": "56" }
                    ]
                },
                {
                    "question": "Does the organization have a secure procedure in place for implementing user account credential changes, whether initiated internally or by user request?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "57" },
                        { "name": "No", "key": "B", "ID": "58" },
                        { "name": "Partially", "key": "C", "ID": "59" },
                        { "name": "I don't know", "key": "D", "ID": "60" }
                    ]
                },
                {
                    "question": "Is access to IT and cybersecurity infrastructure granted only to administrator accounts?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "61" },
                        { "name": "No", "key": "B", "ID": "62" },
                        { "name": "Partially", "key": "C", "ID": "63" },
                        { "name": "I don't know", "key": "D", "ID": "64" }
                    ]
                },
                {
                    "question": "Is feedback from the authentication process blurred?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "65" },
                        { "name": "No", "key": "B", "ID": "66" },
                        { "name": "Partially", "key": "C", "ID": "67" },
                        { "name": "I don't know", "key": "D", "ID": "68" }
                    ]
                },
                {
                    "question": "What actions are taken to manage and update user account inventory?",
                    "options": [
                        { "name": "Default accounts of company assets are managed", "key": "A", "ID": "69" },
                        { "name": "Secure employee account registration process", "key": "B", "ID": "70" },
                        { "name": "User accounts' inventory is implemented and updated at least every 6 months", "key": "C", "ID": "71" },
                        { "name": "Inactive user accounts are automatically removed", "key": "D", "ID": "72" },
                        { "name": "User accounts are removed upon employee termination", "key": "E", "ID": "73" },
                        { "name": "None", "key": "F", "ID": "74" },
                        { "name": "I don't know", "key": "G", "ID": "75" }
                    ]
                },
                {
                    "question": "What tools and procedures are applied to detect unauthorized access to company assets and resources?",
                    "options": [
                        { "name": "Account lock following consecutive invalid login attempts", "key": "A", "ID": "76" },
                        { "name": "Access to information and application functions is restricted", "key": "B", "ID": "77" },
                        { "name": "The use of utility programs with system-overriding and application-control capabilities is restricted", "key": "C", "ID": "78" },
                        { "name": "Idle remote sessions are terminated after a defined period of inactivity", "key": "D", "ID": "79" },
                        { "name": "None", "key": "E", "ID": "80" },
                        { "name": "I don't know", "key": "F", "ID": "81" }
                    ]
                }
            ]
        }
        ,
        {
            "card": "Active Directory",
            "questions": [
                {
                    "question": "Are Group Policy Objects (GPOs) hardened by any of the following configurations?",
                    "options": [
                        { "name": "DNS zones are updated only by using secured updates", "key": "A", "ID": "82" },
                        { "name": "Network LAN Manager (NTLM) protocol is not used", "key": "B", "ID": "83" },
                        { "name": "Kerberos protocol is defined with strong encryption", "key": "C", "ID": "84" },
                        { "name": "Extensible Markup Language (XML) file with cpassword is not allowed in System Volume (Sysvol)", "key": "D", "ID": "85" },
                        { "name": "Admins default login access is restricted", "key": "E", "ID": "86" },
                        { "name": "None", "key": "F", "ID": "87" },
                        { "name": "I don't know", "key": "G", "ID": "88" }
                    ]
                },
                {
                    "question": "Are there any additional password security best practices configured?",
                    "options": [
                        { "name": "Local Administrator Password Solution (LAPS) rules for password management are used", "key": "A", "ID": "89" },
                        { "name": "Reversible encryption is disabled", "key": "B", "ID": "90" },
                        { "name": "LAN Manager (LM) hashes are not stored in the system", "key": "C", "ID": "91" },
                        { "name": "None", "key": "D", "ID": "92" },
                        { "name": "I don't know", "key": "E", "ID": "93" }
                    ]
                },
                {
                    "question": "Do you delete disabled user accounts after a short period of time?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "94" },
                        { "name": "No", "key": "B", "ID": "95" },
                        { "name": "Partially", "key": "C", "ID": "96" },
                        { "name": "I don't know", "key": "D", "ID": "97" }
                    ]
                },
                {
                    "question": "Do you disable user accounts after a short period of inactivity?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "98" },
                        { "name": "No", "key": "B", "ID": "99" },
                        { "name": "Partially", "key": "C", "ID": "100" },
                        { "name": "I don't know", "key": "D", "ID": "101" }
                    ]
                },
                {
                    "question": "How do you protect non-admin accounts?",
                    "options": [
                        { "name": "Protected Users security groups include only sensitive users", "key": "A", "ID": "102" },
                        { "name": "Anonymous users have no access to system information", "key": "B", "ID": "103" },
                        { "name": "Standard users have only standard access permissions", "key": "C", "ID": "104" },
                        { "name": "None", "key": "D", "ID": "105" },
                        { "name": "I don't know", "key": "E", "ID": "106" }
                    ]
                },
                {
                    "question": "How do you protect administrator accounts?",
                    "options": [
                        { "name": "Default local administrator accounts are renamed", "key": "A", "ID": "107" },
                        { "name": "Limited number of accounts in privileged administrative groups", "key": "B", "ID": "108" },
                        { "name": "None", "key": "C", "ID": "109" },
                        { "name": "I don't know", "key": "D", "ID": "110" }
                    ]
                },
                {
                    "question": "How does the company protect domain controllers (DC)?",
                    "options": [
                        { "name": "Default capability of unprivileged users to add computer accounts is prevented", "key": "A", "ID": "111" },
                        { "name": "Server Message Block version 1 (SMBv1) protocol is not supported", "key": "B", "ID": "112" },
                        { "name": "All DC use Kerberos protocol", "key": "C", "ID": "113" },
                        { "name": "All OS versions are updated and supported", "key": "D", "ID": "114" },
                        { "name": "Domain backwards compatibility is disabled", "key": "E", "ID": "115" },
                        { "name": "All DC operating systems have the same configurations", "key": "F", "ID": "116" },
                        { "name": "All DC objects are owned only by domain admin group", "key": "G", "ID": "117" },
                        { "name": "Default privilege administrator groups are empty", "key": "H", "ID": "118" },
                        { "name": "DC policy prohibits insecure permissions", "key": "I", "ID": "119" },
                        { "name": "All trusted domains are known and valid", "key": "J", "ID": "120" },
                        { "name": "None", "key": "K", "ID": "121" },
                        { "name": "I don't know", "key": "L", "ID": "122" }
                    ]
                },
                {
                    "question": "Which of the following password policy and fine-grained password policy settings are configured?",
                    "options": [
                        { "name": "Lockout threshold is between 5-10", "key": "A", "ID": "123" },
                        { "name": "Minimum password length is at least 12 characters", "key": "B", "ID": "124" },
                        { "name": "Complex password option is enabled", "key": "C", "ID": "125" },
                        { "name": "Maximum password age is at most 360 days", "key": "D", "ID": "126" },
                        { "name": "The use of uppercase and lowercase letters, numbers, and special characters is required", "key": "E", "ID": "127" },
                        { "name": "The same password cannot be reused until the password has been reset at least 24 times", "key": "F", "ID": "128" },
                        { "name": "None", "key": "G", "ID": "129" },
                        { "name": "I don't know", "key": "H", "ID": "130" }
                    ]
                }
            ]
        }, {
            "card": "Asset Management",
            "questions": [
                {
                    "question": "Are assets automatically identified using discovery tools?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "131" },
                        { "name": "No", "key": "B", "ID": "132" },
                        { "name": "Partially", "key": "C", "ID": "133" },
                        { "name": "I don't know", "key": "D", "ID": "134" }
                    ]
                },
                {
                    "question": "Are assets documented with the business services they support?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "135" },
                        { "name": "No", "key": "B", "ID": "136" },
                        { "name": "Partially", "key": "C", "ID": "137" },
                        { "name": "I don't know", "key": "D", "ID": "138" }
                    ]
                },
                {
                    "question": "Are assets documented with the level of sensitivity of the data that they store, process, or transmit?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "139" },
                        { "name": "No", "key": "B", "ID": "140" },
                        { "name": "Partially", "key": "C", "ID": "141" },
                        { "name": "I don't know", "key": "D", "ID": "142" }
                    ]
                },
                {
                    "question": "Are company assets handled in a secure way?",
                    "options": [
                        { "name": "Safeguard removable media containing sensitive information and encrypt its data", "key": "A", "ID": "143" },
                        { "name": "Procedures for handling assets are well defined and documented", "key": "B", "ID": "144" },
                        { "name": "Assets leaving company premises are tracked and protected", "key": "C", "ID": "145" },
                        { "name": "Obsolete software is handled", "key": "D", "ID": "146" },
                        { "name": "Unauthorized hardware and software assets are removed", "key": "E", "ID": "147" },
                        { "name": "None", "key": "F", "ID": "148" },
                        { "name": "I don't know", "key": "G", "ID": "149" }
                    ]
                },
                {
                    "question": "Are company assets identified and inventoried?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "150" },
                        { "name": "No", "key": "B", "ID": "151" },
                        { "name": "Partially", "key": "C", "ID": "152" },
                        { "name": "I don't know", "key": "D", "ID": "153" }
                    ]
                },
                {
                    "question": "Are data flows diagramed or documented for systems that store, process, or transmit sensitive data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "154" },
                        { "name": "No", "key": "B", "ID": "155" },
                        { "name": "Partially", "key": "C", "ID": "156" },
                        { "name": "I don't know", "key": "D", "ID": "157" }
                    ]
                },
                {
                    "question": "Are employees and contractors required to return organizational assets within a defined time period upon termination of employment or contract?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "158" },
                        { "name": "No", "key": "B", "ID": "159" },
                        { "name": "Partially", "key": "C", "ID": "160" },
                        { "name": "I don't know", "key": "D", "ID": "161" }
                    ]
                },
                {
                    "question": "Are employees aware and do they sign an acknowledgment that company assets should not be sold, given as gifts, loaned, exchanged, or disposed of unless specifically authorized by management?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "162" },
                        { "name": "No", "key": "B", "ID": "163" },
                        { "name": "Partially", "key": "C", "ID": "164" },
                        { "name": "I don't know", "key": "D", "ID": "165" }
                    ]
                },
                {
                    "question": "Does each asset have an identified owner?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "166" },
                        { "name": "No", "key": "B", "ID": "167" },
                        { "name": "Partially", "key": "C", "ID": "168" },
                        { "name": "I don't know", "key": "D", "ID": "169" }
                    ]
                },
                {
                    "question": "Does the company label media containing sensitive information?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "170" },
                        { "name": "No", "key": "B", "ID": "171" },
                        { "name": "Partially", "key": "C", "ID": "172" },
                        { "name": "I don't know", "key": "D", "ID": "173" }
                    ]
                },
                {
                    "question": "Does the organization mark its authentication and authorization systems?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "174" },
                        { "name": "No", "key": "B", "ID": "175" },
                        { "name": "Partially", "key": "C", "ID": "176" },
                        { "name": "I don't know", "key": "D", "ID": "177" }
                    ]
                },
                {
                    "question": "Does your company hold an updated network diagram?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "178" },
                        { "name": "No", "key": "B", "ID": "179" },
                        { "name": "Partially", "key": "C", "ID": "180" },
                        { "name": "I don't know", "key": "D", "ID": "181" }
                    ]
                },
                {
                    "question": "Is electronic media wiped or written over to ensure that sensitive data cannot be recovered?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "182" },
                        { "name": "No", "key": "B", "ID": "183" },
                        { "name": "Partially", "key": "C", "ID": "184" },
                        { "name": "I don't know", "key": "D", "ID": "185" }
                    ]
                },
                {
                    "question": "Is media destroyed if it cannot be sanitized?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "186" },
                        { "name": "No", "key": "B", "ID": "187" },
                        { "name": "Partially", "key": "C", "ID": "188" },
                        { "name": "I don't know", "key": "D", "ID": "189" }
                    ]
                },
                {
                    "question": "Is sensitive information that is printed shredded after use?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "190" },
                        { "name": "No", "key": "B", "ID": "191" },
                        { "name": "Partially", "key": "C", "ID": "192" },
                        { "name": "I don't know", "key": "D", "ID": "193" }
                    ]
                },
                {
                    "question": "Is the acceptable use of company assets defined in a policy or employee handbook?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "194" },
                        { "name": "No", "key": "B", "ID": "195" },
                        { "name": "Partially", "key": "C", "ID": "196" },
                        { "name": "I don't know", "key": "D", "ID": "197" }
                    ]
                },
                {
                    "question": "Is the asset inventory updated whenever there are changes to the assets, services, or environment?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "198" },
                        { "name": "No", "key": "B", "ID": "199" },
                        { "name": "Partially", "key": "C", "ID": "200" },
                        { "name": "I don't know", "key": "D", "ID": "201" }
                    ]
                }
            ]
        }
        , {
            "card": "Awareness",
            "questions": [
                {
                    "question": "Do you have specific awareness training for the following?",
                    "options": [
                        { "name": "Company management", "key": "A", "ID": "202" },
                        { "name": "Software developers", "key": "B", "ID": "203" },
                        { "name": "Physical security personnel", "key": "C", "ID": "204" },
                        { "name": "Cybersecurity personnel & users with administrative access privileges", "key": "D", "ID": "205" },
                        { "name": "None", "key": "E", "ID": "206" },
                        { "name": "I don't know", "key": "F", "ID": "207" }
                    ]
                },
                {
                    "question": "How does your company raise employees' cybersecurity awareness?",
                    "options": [
                        { "name": "Hold attack simulation exercises", "key": "A", "ID": "208" },
                        { "name": "Special training to detect a sign of an incident", "key": "B", "ID": "209" },
                        { "name": "Have all employees sign company cybersecurity policy", "key": "C", "ID": "210" },
                        { "name": "Collect and store training data", "key": "D", "ID": "211" },
                        { "name": "Hold awareness training meetings, briefs and updates", "key": "E", "ID": "212" },
                        { "name": "None", "key": "F", "ID": "213" },
                        { "name": "I don't know", "key": "G", "ID": "214" }
                    ]
                }
            ]
        }
        , {
            "card": "Business Continuity",
            "questions": [
                {
                    "question": "Do you use dedicated admin accounts for backing up tasks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "215" },
                        { "name": "No", "key": "B", "ID": "216" },
                        { "name": "Partially", "key": "C", "ID": "217" },
                        { "name": "I don't know", "key": "D", "ID": "218" }
                    ]
                },
                {
                    "question": "Does the backup process include a routine network storage backup, such as HD Array or NetApp?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "219" },
                        { "name": "No", "key": "B", "ID": "220" },
                        { "name": "The company doesn't use network storage devices", "key": "C", "ID": "221" },
                        { "name": "I don't know", "key": "D", "ID": "222" }
                    ]
                },
                {
                    "question": "Does the backup process include routinely backing up company servers, including configuration and data from on-premises and cloud servers?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "223" },
                        { "name": "No", "key": "B", "ID": "224" },
                        { "name": "The company doesn't use servers", "key": "C", "ID": "225" },
                        { "name": "I don't know", "key": "D", "ID": "226" }
                    ]
                },
                {
                    "question": "Does the backup process include routinely backing up network device data and configuration that it supports and maintains?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "227" },
                        { "name": "No", "key": "B", "ID": "228" },
                        { "name": "The company doesn't use network devices", "key": "C", "ID": "229" },
                        { "name": "I don't know", "key": "D", "ID": "230" }
                    ]
                },
                {
                    "question": "Does the company back up vital data from company workstations?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "231" },
                        { "name": "No", "key": "B", "ID": "232" },
                        { "name": "The company doesn't have or allow storing data on workstations", "key": "C", "ID": "233" },
                        { "name": "I don't know", "key": "D", "ID": "234" }
                    ]
                },
                {
                    "question": "Does the company conduct training for personnel and relevant stakeholders in their contingency roles and responsibilities?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "235" },
                        { "name": "No", "key": "B", "ID": "236" },
                        { "name": "Partially", "key": "C", "ID": "237" },
                        { "name": "I don't know", "key": "D", "ID": "238" }
                    ]
                },
                {
                    "question": "Does the company have a management-approved RPO and RTO for each business-critical process?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "239" },
                        { "name": "No", "key": "B", "ID": "240" },
                        { "name": "Partially", "key": "C", "ID": "241" },
                        { "name": "I don't know", "key": "D", "ID": "242" }
                    ]
                },
                {
                    "question": "Does the company have a separate, alternative site for server deployment and employees' workplaces in case the main site is inaccessible?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "243" },
                        { "name": "No", "key": "B", "ID": "244" },
                        { "name": "Partially", "key": "C", "ID": "245" },
                        { "name": "I don't know", "key": "D", "ID": "246" }
                    ]
                },
                {
                    "question": "Does the company have information processing facilities with redundancy sufficient to meet availability requirements?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "247" },
                        { "name": "No", "key": "B", "ID": "248" },
                        { "name": "Partially", "key": "C", "ID": "249" },
                        { "name": "I don't know", "key": "D", "ID": "250" }
                    ]
                },
                {
                    "question": "Does the company have sufficient resources to meet the RPO and RTO targets of each critical business process?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "251" },
                        { "name": "No", "key": "B", "ID": "252" },
                        { "name": "Partially", "key": "C", "ID": "253" },
                        { "name": "I don't know", "key": "D", "ID": "254" }
                    ]
                },
                {
                    "question": "Does the company maintain a separate offline storage for data backup?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "255" },
                        { "name": "No", "key": "B", "ID": "256" },
                        { "name": "Partially", "key": "C", "ID": "257" },
                        { "name": "I don't know", "key": "D", "ID": "258" }
                    ]
                },
                {
                    "question": "Does the company map critical data related to critical assets mapping?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "259" },
                        { "name": "No", "key": "B", "ID": "260" },
                        { "name": "Partially", "key": "C", "ID": "261" },
                        { "name": "I don't know", "key": "D", "ID": "262" }
                    ]
                },
                {
                    "question": "Does the company map critical processes and assets?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "263" },
                        { "name": "No", "key": "B", "ID": "264" },
                        { "name": "Partially", "key": "C", "ID": "265" },
                        { "name": "I don't know", "key": "D", "ID": "266" }
                    ]
                },
                {
                    "question": "Does the company perform periodic recovery tests?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "267" },
                        { "name": "No", "key": "B", "ID": "268" },
                        { "name": "Partially", "key": "C", "ID": "269" },
                        { "name": "I don't know", "key": "D", "ID": "270" }
                    ]
                },
                {
                    "question": "Does the company routinely back up external storage devices such as external hard drives?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "271" },
                        { "name": "No", "key": "B", "ID": "272" },
                        { "name": "The company doesn't use external storage devices", "key": "C", "ID": "273" },
                        { "name": "I don't know", "key": "D", "ID": "274" }
                    ]
                },
                {
                    "question": "Does the company routinely back up on-premises applications or SaaS data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "275" },
                        { "name": "No", "key": "B", "ID": "276" },
                        { "name": "The company doesn't have important business data stored on applications or SaaS services", "key": "C", "ID": "277" },
                        { "name": "I don't know", "key": "D", "ID": "278" }
                    ]
                },
                {
                    "question": "Is the backup data encrypted?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "279" },
                        { "name": "No", "key": "B", "ID": "280" },
                        { "name": "Partially", "key": "C", "ID": "281" },
                        { "name": "I don't know", "key": "D", "ID": "282" }
                    ]
                },
                {
                    "question": "Which of the following does your company execute to effectively recover from cybersecurity incidents?",
                    "options": [
                        { "name": "Manages public relations and reputation", "key": "A", "ID": "283" },
                        { "name": "Integrates lessons learned into recovery processes", "key": "B", "ID": "284" },
                        { "name": "Executes recovery plans", "key": "C", "ID": "285" },
                        { "name": "None", "key": "D", "ID": "286" },
                        { "name": "I don't know", "key": "E", "ID": "287" }
                    ]
                }
            ]
        }
        , {
            "card": "Change and Configuration Management",
            "questions": [
                {
                    "question": "Are all changes documented, reviewed, and audited?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "288" },
                        { "name": "No", "key": "B", "ID": "289" },
                        { "name": "Partially", "key": "C", "ID": "290" },
                        { "name": "I don't know", "key": "D", "ID": "291" }
                    ]
                },
                {
                    "question": "Are all changes logged in a change management system?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "292" },
                        { "name": "No", "key": "B", "ID": "293" },
                        { "name": "Partially", "key": "C", "ID": "294" },
                        { "name": "I don't know", "key": "D", "ID": "295" }
                    ]
                },
                {
                    "question": "Are changes required to be approved before the change can occur?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "296" },
                        { "name": "No", "key": "B", "ID": "297" },
                        { "name": "Partially", "key": "C", "ID": "298" },
                        { "name": "I don't know", "key": "D", "ID": "299" }
                    ]
                },
                {
                    "question": "Are changes to critical systems reviewed for security impact before the change is performed?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "300" },
                        { "name": "No", "key": "B", "ID": "301" },
                        { "name": "Partially", "key": "C", "ID": "302" },
                        { "name": "I don't know", "key": "D", "ID": "303" }
                    ]
                },
                {
                    "question": "Are changes to systems tested, validated, and documented before the change is performed?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "304" },
                        { "name": "No", "key": "B", "ID": "305" },
                        { "name": "Partially", "key": "C", "ID": "306" },
                        { "name": "I don't know", "key": "D", "ID": "307" }
                    ]
                },
                {
                    "question": "Are configuration baselines used, and are they based on an industry-standard such as the CIS Benchmarks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "308" },
                        { "name": "No", "key": "B", "ID": "309" },
                        { "name": "Partially", "key": "C", "ID": "310" },
                        { "name": "I don't know", "key": "D", "ID": "311" }
                    ]
                },
                {
                    "question": "Are deviations from baseline configuration changes approved?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "312" },
                        { "name": "No", "key": "B", "ID": "313" },
                        { "name": "Partially", "key": "C", "ID": "314" },
                        { "name": "I don't know", "key": "D", "ID": "315" }
                    ]
                },
                {
                    "question": "Are master configurations or baselines stored securely?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "316" },
                        { "name": "No", "key": "B", "ID": "317" },
                        { "name": "Partially", "key": "C", "ID": "318" },
                        { "name": "I don't know", "key": "D", "ID": "319" }
                    ]
                },
                {
                    "question": "Are only authorized software, firmware, and scripts allowed to be run on systems?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "320" },
                        { "name": "No", "key": "B", "ID": "321" },
                        { "name": "Partially", "key": "C", "ID": "322" },
                        { "name": "I don't know", "key": "D", "ID": "323" }
                    ]
                },
                {
                    "question": "Are systems backed up before a change is made?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "324" },
                        { "name": "No", "key": "B", "ID": "325" },
                        { "name": "Partially", "key": "C", "ID": "326" },
                        { "name": "I don't know", "key": "D", "ID": "327" }
                    ]
                },
                {
                    "question": "Are systems configured to provide only the necessary ports, protocols, and service needed for operations?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "328" },
                        { "name": "No", "key": "B", "ID": "329" },
                        { "name": "Partially", "key": "C", "ID": "330" },
                        { "name": "I don't know", "key": "D", "ID": "331" }
                    ]
                },
                {
                    "question": "Are unauthorized changes monitored?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "332" },
                        { "name": "No", "key": "B", "ID": "333" },
                        { "name": "Partially", "key": "C", "ID": "334" },
                        { "name": "I don't know", "key": "D", "ID": "335" }
                    ]
                },
                {
                    "question": "Does each system have a documented list of authorized software, firmware, and scripts?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "336" },
                        { "name": "No", "key": "B", "ID": "337" },
                        { "name": "Partially", "key": "C", "ID": "338" },
                        { "name": "I don't know", "key": "D", "ID": "339" }
                    ]
                },
                {
                    "question": "Does each system have the basic security controls of antivirus, central management, and logging?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "340" },
                        { "name": "No", "key": "B", "ID": "341" },
                        { "name": "Partially", "key": "C", "ID": "342" },
                        { "name": "I don't know", "key": "D", "ID": "343" }
                    ]
                },
                {
                    "question": "Does the company restrict physical and logical access associated with changes to organizational systems?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "344" },
                        { "name": "No", "key": "B", "ID": "345" },
                        { "name": "Partially", "key": "C", "ID": "346" },
                        { "name": "I don't know", "key": "D", "ID": "347" }
                    ]
                },
                {
                    "question": "Does the organization manage changes to information systems?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "348" },
                        { "name": "No", "key": "B", "ID": "349" },
                        { "name": "Partially", "key": "C", "ID": "350" },
                        { "name": "I don't know", "key": "D", "ID": "351" }
                    ]
                },
                {
                    "question": "Is there a backup of previous configurations?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "352" },
                        { "name": "No", "key": "B", "ID": "353" },
                        { "name": "Partially", "key": "C", "ID": "354" },
                        { "name": "I don't know", "key": "D", "ID": "355" }
                    ]
                }
            ]
        }
        , {
            "card": "Compliance and Auditing",
            "questions": [
                {
                    "question": "Are legislative, regulatory and contractual requirements related to intellectual property rights identified?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "473" },
                        { "name": "No", "key": "B", "ID": "474" },
                        { "name": "Partially", "key": "C", "ID": "475" },
                        { "name": "I don't know", "key": "D", "ID": "476" }
                    ]
                },
                {
                    "question": "Are regulations and standards that apply to the company identified?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "477" },
                        { "name": "No", "key": "B", "ID": "478" },
                        { "name": "Partially", "key": "C", "ID": "479" },
                        { "name": "I don't know", "key": "D", "ID": "480" }
                    ]
                },
                {
                    "question": "Does the company hold a compliance and governance program?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "481" },
                        { "name": "No", "key": "B", "ID": "482" },
                        { "name": "Partially", "key": "C", "ID": "483" },
                        { "name": "I don't know", "key": "D", "ID": "484" }
                    ]
                },
                {
                    "question": "How do you regularly monitor and review the company's compliance with cybersecurity policies, controls’ efficiency, industry standards, and regulatory requirements?",
                    "options": [
                        { "name": "Periodic internal audits of company cybersecurity processes", "key": "A", "ID": "485" },
                        { "name": "Periodic external audits of company cybersecurity processes", "key": "B", "ID": "486" },
                        { "name": "Regularly reviewing control implementation status, effectiveness & efficiency", "key": "C", "ID": "487" },
                        { "name": "All managers regularly review procedures for compliance within their area of responsibility", "key": "D", "ID": "488" },
                        { "name": "None", "key": "E", "ID": "489" },
                        { "name": "I don't know", "key": "F", "ID": "490" }
                    ]
                }
            ]
        }
        , {
            "card": "Data Protection",
            "questions": [
                {
                    "question": "Does the company comply with a cryptographic policy?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "491" },
                        { "name": "No", "key": "B", "ID": "492" },
                        { "name": "A cryptographic policy does not exist", "key": "C", "ID": "493" },
                        { "name": "I don't know", "key": "D", "ID": "494" }
                    ]
                },
                {
                    "question": "Does the company comply with a key management policy?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "495" },
                        { "name": "No", "key": "B", "ID": "496" },
                        { "name": "Partially", "key": "C", "ID": "497" },
                        { "name": "I don't know", "key": "D", "ID": "498" }
                    ]
                },
                {
                    "question": "Does the company comply with regulated data retention and deletion policies according to law or business agreements?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "499" },
                        { "name": "No", "key": "B", "ID": "500" },
                        { "name": "Partially", "key": "C", "ID": "501" },
                        { "name": "I don't know", "key": "D", "ID": "502" }
                    ]
                },
                {
                    "question": "Does the company enforce a remote wipe capability for lost or stolen devices, or for when employees leave the company?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "503" },
                        { "name": "No", "key": "B", "ID": "504" },
                        { "name": "Partially", "key": "C", "ID": "505" },
                        { "name": "I don't know", "key": "D", "ID": "506" }
                    ]
                },
                {
                    "question": "Does the company generate its own cryptographic keys?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "507" },
                        { "name": "No", "key": "B", "ID": "508" },
                        { "name": "Partially", "key": "C", "ID": "509" },
                        { "name": "I don't know", "key": "D", "ID": "510" }
                    ]
                },
                {
                    "question": "Does the company have tools and procedures in place for ensuring the integrity of sensitive data during transmission and storage?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "511" },
                        { "name": "No", "key": "B", "ID": "512" },
                        { "name": "Partially", "key": "C", "ID": "513" },
                        { "name": "I don't know", "key": "D", "ID": "514" }
                    ]
                },
                {
                    "question": "Is there a process in place to map the regulations or compliances that apply to the data the company collects?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "515" },
                        { "name": "No", "key": "B", "ID": "516" },
                        { "name": "Partially", "key": "C", "ID": "517" },
                        { "name": "I don't know", "key": "D", "ID": "518" }
                    ]
                },
                {
                    "question": "What processes are being used to protect company sensitive data?",
                    "options": [
                        { "name": "Restricting outgoing and incoming data", "key": "A", "ID": "519" },
                        { "name": "Information labeling protocols", "key": "B", "ID": "520" },
                        { "name": "Discovery and classification", "key": "C", "ID": "521" },
                        { "name": "Access limitation to specific user groups", "key": "D", "ID": "522" },
                        { "name": "Access limitation to network folders and shared resources", "key": "E", "ID": "523" },
                        { "name": "Limit and manage the publishing of information to the public", "key": "F", "ID": "524" },
                        { "name": "Prohibiting file sharing from company workstation", "key": "G", "ID": "525" },
                        { "name": "Restricting the use of removable storage devices in external systems", "key": "H", "ID": "526" },
                        { "name": "Signing confidentiality or nondisclosure agreements", "key": "I", "ID": "527" },
                        { "name": "None", "key": "J", "ID": "528" },
                        { "name": "I don't know", "key": "K", "ID": "529" }
                    ]
                },
                {
                    "question": "What tools are applied to protect company sensitive data?",
                    "options": [
                        { "name": "Logging and monitoring of data transactions", "key": "A", "ID": "530" },
                        { "name": "Data Leak Prevention (DLP)", "key": "B", "ID": "531" },
                        { "name": "Sensitive logs access restriction", "key": "C", "ID": "532" },
                        { "name": "Encryption of data communication (in transit)", "key": "D", "ID": "533" },
                        { "name": "Network segmentation for sensitive data", "key": "E", "ID": "534" },
                        { "name": "Encryption of data that is saved on removable media", "key": "F", "ID": "535" },
                        { "name": "Encryption of databases and repositories (at rest)", "key": "G", "ID": "536" },
                        { "name": "None", "key": "H", "ID": "537" },
                        { "name": "I don't know", "key": "I", "ID": "538" }
                    ]
                }
            ]
        }
        , {
            "card": "Domain and DNS",
            "questions": [
                {
                    "question": "DNS servers logs can greatly support both detection and investigation for cyber attacks on your DNS server. Is the logging feature for DNS queries enabled?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "539" },
                        { "name": "No", "key": "B", "ID": "540" },
                        { "name": "Partially", "key": "C", "ID": "541" },
                        { "name": "I don't know", "key": "D", "ID": "542" }
                    ]
                },
                {
                    "question": "Do all your domain registrations have current and updated user details for the domain name registration?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "543" },
                        { "name": "No", "key": "B", "ID": "544" },
                        { "name": "Partially", "key": "C", "ID": "545" },
                        { "name": "I don't know", "key": "D", "ID": "546" }
                    ]
                },
                {
                    "question": "Do you have a process to periodically check domain renewal time and removing obsolete ones?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "547" },
                        { "name": "No", "key": "B", "ID": "548" },
                        { "name": "Partially", "key": "C", "ID": "549" },
                        { "name": "I don't know", "key": "D", "ID": "550" }
                    ]
                },
                {
                    "question": "Do you have an internal DNS server (whether on-premise or cloud) which is owned and maintained by the company?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "551" },
                        { "name": "No", "key": "B", "ID": "552" },
                        { "name": "Partially", "key": "C", "ID": "553" },
                        { "name": "I don't know", "key": "D", "ID": "554" }
                    ]
                },
                {
                    "question": "Do you use a well-known public DNS resolver for your internal DNS server or your workstations (such as: Google, Cloudflare etc.)?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "555" },
                        { "name": "No", "key": "B", "ID": "556" },
                        { "name": "Partially", "key": "C", "ID": "557" },
                        { "name": "I don't know", "key": "D", "ID": "558" }
                    ]
                },
                {
                    "question": "Domain lock prevents attacker from transferring your domain to another domain registrar without your approval. Did you enable the domain lock to all your domain names?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "559" },
                        { "name": "No", "key": "B", "ID": "560" },
                        { "name": "Partially", "key": "C", "ID": "561" },
                        { "name": "I don't know", "key": "D", "ID": "562" }
                    ]
                },
                {
                    "question": "Have you enabled DNSSEC for your domain?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "563" },
                        { "name": "No", "key": "B", "ID": "564" },
                        { "name": "Partially", "key": "C", "ID": "565" },
                        { "name": "I don't know", "key": "D", "ID": "566" }
                    ]
                },
                {
                    "question": "Have you enforced MFA to the domain name account?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "567" },
                        { "name": "No", "key": "B", "ID": "568" },
                        { "name": "Partially", "key": "C", "ID": "569" },
                        { "name": "I don't know", "key": "D", "ID": "570" }
                    ]
                },
                {
                    "question": "Prevention of exploiting the DNS server can be done by simple Firewall rules. Is the DNS server allowed to go to the approved external DNS resolvers (such as: Cloudflare, OpenDNS etc..)?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "571" },
                        { "name": "No", "key": "B", "ID": "572" },
                        { "name": "Partially", "key": "C", "ID": "573" },
                        { "name": "I don't know", "key": "D", "ID": "574" }
                    ]
                },
                {
                    "question": "Which of the following information do you have in the organization domain registrar?",
                    "options": [
                        { "name": "Backup payment details", "key": "A", "ID": "575" },
                        { "name": "Backup contact details", "key": "B", "ID": "576" },
                        { "name": "None", "key": "C", "ID": "577" },
                        { "name": "I don't know", "key": "D", "ID": "578" }
                    ]
                }
            ]
        }
        , {
            "card": "Email and Messages",
            "questions": [
                {
                    "question": "Does the company have an approved Email proper use policy which is known to all the employees?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "579" },
                        { "name": "No", "key": "B", "ID": "580" },
                        { "name": "Partially", "key": "C", "ID": "581" },
                        { "name": "I don't know", "key": "D", "ID": "582" }
                    ]
                },
                {
                    "question": "Does the organization manage and secure both on-premise Voice over Internet Protocol (VoIP) devices and SaaS VoIP applications in an integrated manner?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "583" },
                        { "name": "No", "key": "B", "ID": "584" },
                        { "name": "Partially", "key": "C", "ID": "585" },
                        { "name": "I don't know", "key": "D", "ID": "586" },
                        { "name": "Not Applicable", "key": "E", "ID": "587" }
                    ]
                },
                {
                    "question": "Is a designated admin account being used to perform all administrative tasks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "588" },
                        { "name": "No", "key": "B", "ID": "589" },
                        { "name": "Partially", "key": "C", "ID": "590" },
                        { "name": "I don't know", "key": "D", "ID": "591" }
                    ]
                },
                {
                    "question": "Is there a third-party protection tool applied to your email service?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "592" },
                        { "name": "No", "key": "B", "ID": "593" },
                        { "name": "Partially", "key": "C", "ID": "594" },
                        { "name": "I don't know", "key": "D", "ID": "595" }
                    ]
                },
                {
                    "question": "What security measures are taken to protect electronic messaging applications?",
                    "options": [
                        { "name": "Best practices to use electronic message applications securely", "key": "A", "ID": "596" },
                        { "name": "Information type transferred by electronic message applications is determined", "key": "B", "ID": "597" },
                        { "name": "None", "key": "C", "ID": "598" },
                        { "name": "I don't know", "key": "D", "ID": "599" }
                    ]
                },
                {
                    "question": "Which of the following incoming email configurations are applied to the email service?",
                    "options": [
                        { "name": "Anti-malware", "key": "A", "ID": "600" },
                        { "name": "Check for spoofing protection - DMARC/DKIM/SPF", "key": "B", "ID": "601" },
                        { "name": "Anti-spam", "key": "C", "ID": "602" },
                        { "name": "None", "key": "D", "ID": "603" },
                        { "name": "I don't know", "key": "E", "ID": "604" }
                    ]
                },
                {
                    "question": "Which of the following outgoing email configurations are applied to the email service?",
                    "options": [
                        { "name": "DMARC / DKIM / SPF", "key": "A", "ID": "605" },
                        { "name": "TLS encryption protocol", "key": "B", "ID": "606" },
                        { "name": "Sensitive message encryption", "key": "C", "ID": "607" },
                        { "name": "DLP protection", "key": "D", "ID": "608" },
                        { "name": "None", "key": "E", "ID": "609" },
                        { "name": "I don't know", "key": "F", "ID": "610" }
                    ]
                },
                {
                    "question": "Which of the following simulation and awareness exercises are being held to improve employee awareness?",
                    "options": [
                        { "name": "Email awareness activities such as meetings, updates and briefs", "key": "A", "ID": "611" },
                        { "name": "Internal Phishing simulation exercises", "key": "B", "ID": "612" },
                        { "name": "None", "key": "C", "ID": "613" },
                        { "name": "I don't know", "key": "D", "ID": "614" }
                    ]
                },
                {
                    "question": "Which security configurations are applied to the email service?",
                    "options": [
                        { "name": "Prohibit the use of forwarding rules", "key": "A", "ID": "615" },
                        { "name": "Multi-Factor Authentication", "key": "B", "ID": "616" },
                        { "name": "None", "key": "C", "ID": "617" },
                        { "name": "I don't know", "key": "D", "ID": "618" }
                    ]
                }
            ]
        }
        , {
            "card": "Endpoints and Mobile Devices",
            "questions": [
                {
                    "question": "Are all your workstations owned by the company?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "619" },
                        { "name": "No", "key": "B", "ID": "620" },
                        { "name": "Partially", "key": "C", "ID": "621" },
                        { "name": "I don't know", "key": "D", "ID": "622" }
                    ]
                },
                {
                    "question": "Do you use a central management tool to control your workstations' configuration?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "623" },
                        { "name": "No", "key": "B", "ID": "624" },
                        { "name": "Partially", "key": "C", "ID": "625" },
                        { "name": "I don't know", "key": "D", "ID": "626" }
                    ]
                },
                {
                    "question": "Do you use different local admin strong passwords for each workstation?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "627" },
                        { "name": "No", "key": "B", "ID": "628" },
                        { "name": "Partially", "key": "C", "ID": "629" },
                        { "name": "I don't know", "key": "D", "ID": "630" }
                    ]
                },
                {
                    "question": "Do you use mobile devices to access company assets?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "631" },
                        { "name": "No", "key": "B", "ID": "632" },
                        { "name": "Partially", "key": "C", "ID": "633" },
                        { "name": "I don't know", "key": "D", "ID": "634" }
                    ]
                },
                {
                    "question": "Have policies and procedures been established and documented for the use of mobile devices within the organization?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "635" },
                        { "name": "No", "key": "B", "ID": "636" },
                        { "name": "Partially", "key": "C", "ID": "637" },
                        { "name": "I don't know", "key": "D", "ID": "638" }
                    ]
                },
                {
                    "question": "How are collaborative computing devices being protected?",
                    "options": [
                        { "name": "Indication of devices activation is visible to users", "key": "A", "ID": "639" },
                        { "name": "Remote access is restricted", "key": "B", "ID": "640" },
                        { "name": "None", "key": "C", "ID": "641" },
                        { "name": "I don't know", "key": "D", "ID": "642" }
                    ]
                },
                {
                    "question": "What measures are taken to protect mobile devices with access to company data?",
                    "options": [
                        { "name": "Applying security measures on mobile devices", "key": "A", "ID": "643" },
                        { "name": "Secure workspace for work-related applications on mobile devices", "key": "B", "ID": "644" },
                        { "name": "None", "key": "C", "ID": "645" },
                        { "name": "I don't know", "key": "D", "ID": "646" }
                    ]
                },
                {
                    "question": "Which additional security controls are used to protect your company's workstations?",
                    "options": [
                        { "name": "Disabled external media connections", "key": "A", "ID": "647" },
                        { "name": "Uninstall unnecessary services", "key": "B", "ID": "648" },
                        { "name": "Strong passwords according to our company's policy", "key": "C", "ID": "649" },
                        { "name": "No more than two local admins", "key": "D", "ID": "650" },
                        { "name": "Lockout following multiple failed login attempts", "key": "E", "ID": "651" },
                        { "name": "An authorized applications list", "key": "F", "ID": "652" },
                        { "name": "Regular application patching", "key": "G", "ID": "653" },
                        { "name": "None", "key": "H", "ID": "654" },
                        { "name": "I don't know", "key": "I", "ID": "655" }
                    ]
                },
                {
                    "question": "Which security controls are used to protect your company's laptops?",
                    "options": [
                        { "name": "Laptop internal firewall", "key": "A", "ID": "656" },
                        { "name": "Hard disk encryption", "key": "B", "ID": "657" },
                        { "name": "None", "key": "C", "ID": "658" },
                        { "name": "I don't know", "key": "D", "ID": "659" }
                    ]
                },
                {
                    "question": "Which security controls are used to protect your company's workstations?",
                    "options": [
                        { "name": "A workstation inactivity lockout", "key": "A", "ID": "660" },
                        { "name": "A workstation firewall", "key": "B", "ID": "661" },
                        { "name": "Advanced endpoint protection", "key": "C", "ID": "662" },
                        { "name": "Automatic OS updates", "key": "D", "ID": "663" },
                        { "name": "Up-To-Date AntiMalware (AntiVirus)", "key": "E", "ID": "664" },
                        { "name": "None", "key": "F", "ID": "665" },
                        { "name": "I don't know", "key": "G", "ID": "666" }
                    ]
                }
            ]
        }
        , {
            "card": "Environmental Control",
            "questions": [
                {
                    "question": "How do you protect company equipment?",
                    "options": [
                        { "name": "Alternative power source for the case of power outage", "key": "A", "ID": "667" },
                        { "name": "Humidity monitoring", "key": "B", "ID": "668" },
                        { "name": "Cables and electrical equipment are well maintained", "key": "C", "ID": "669" },
                        { "name": "None", "key": "D", "ID": "670" },
                        { "name": "I don't know", "key": "E", "ID": "671" }
                    ]
                },
                {
                    "question": "How do you protect company facilities and employees?",
                    "options": [
                        { "name": "Fire suppression system", "key": "A", "ID": "672" },
                        { "name": "Water system master shutoff", "key": "B", "ID": "673" },
                        { "name": "Emergency light system", "key": "C", "ID": "674" },
                        { "name": "None", "key": "D", "ID": "675" },
                        { "name": "I don't know", "key": "E", "ID": "676" }
                    ]
                }
            ]
        }
        , {
            "card": "Hosted Network",
            "questions": [
                {
                    "question": "Are all company sites firewall secured and all communications between sites encrypted?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "677" },
                        { "name": "No", "key": "B", "ID": "678" },
                        { "name": "Partially", "key": "C", "ID": "679" },
                        { "name": "I don't know", "key": "D", "ID": "680" }
                    ]
                },
                {
                    "question": "Are internet-facing firewalls being used to protect company hosted networks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "681" },
                        { "name": "No", "key": "B", "ID": "682" },
                        { "name": "Partially", "key": "C", "ID": "683" },
                        { "name": "I don't know", "key": "D", "ID": "684" }
                    ]
                },
                {
                    "question": "Are there dedicated workstations and network segments assigned for administrative tasks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "685" },
                        { "name": "No", "key": "B", "ID": "686" },
                        { "name": "Partially", "key": "C", "ID": "687" },
                        { "name": "I don't know", "key": "D", "ID": "688" }
                    ]
                },
                {
                    "question": "By what means can the company network be remotely connected to user accounts?",
                    "options": [
                        { "name": "Using Multi-factor authentication", "key": "A", "ID": "689" },
                        { "name": "Using a VPN or a solution that employs a VPN", "key": "B", "ID": "690" },
                        { "name": "Using externally exposed Windows Remote Desktop (RDP)", "key": "C", "ID": "691" },
                        { "name": "None", "key": "D", "ID": "692" },
                        { "name": "I don't know", "key": "E", "ID": "693" }
                    ]
                },
                {
                    "question": "Does your company have multiple physical sites with hosted networks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "694" },
                        { "name": "No", "key": "B", "ID": "695" },
                        { "name": "Partially", "key": "C", "ID": "696" },
                        { "name": "I don't know", "key": "D", "ID": "697" }
                    ]
                },
                {
                    "question": "Is remote connectivity to company network allowed in cases such as teleworking?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "698" },
                        { "name": "No", "key": "B", "ID": "699" },
                        { "name": "Partially", "key": "C", "ID": "700" },
                        { "name": "I don't know", "key": "D", "ID": "701" }
                    ]
                },
                {
                    "question": "Is there a procedure to ensure a secure network infrastructure management?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "702" },
                        { "name": "No", "key": "B", "ID": "703" },
                        { "name": "Partially", "key": "C", "ID": "704" },
                        { "name": "I don't know", "key": "D", "ID": "705" }
                    ]
                },
                {
                    "question": "Please select all network devices protection methods used by your company at your hosted network.",
                    "options": [
                        { "name": "Firewalls are hardened", "key": "A", "ID": "706" },
                        { "name": "Logs are continuously monitored", "key": "B", "ID": "707" },
                        { "name": "Firewall logs are stored in a different network segment", "key": "C", "ID": "708" },
                        { "name": "High-severity firewall alerts are monitored", "key": "D", "ID": "709" },
                        { "name": "Only necessary ports are exposed", "key": "E", "ID": "710" },
                        { "name": "Hardware is securely stored physically accessible only to authorized personnel", "key": "F", "ID": "711" },
                        { "name": "Regular patching", "key": "G", "ID": "712" },
                        { "name": "None", "key": "H", "ID": "713" },
                        { "name": "I don't know", "key": "I", "ID": "714" }
                    ]
                },
                {
                    "question": "Please select other network protection used by your company on your hosted network.",
                    "options": [
                        { "name": "Network traffic anomaly detection", "key": "A", "ID": "715" },
                        { "name": "Network segmentation", "key": "B", "ID": "716" },
                        { "name": "Web filtering tools for Internet access", "key": "C", "ID": "717" },
                        { "name": "Network Access Control (NAC)", "key": "D", "ID": "718" },
                        { "name": "Network Address Translation (NAT)", "key": "E", "ID": "719" },
                        { "name": "Switches configurations hardening", "key": "F", "ID": "720" },
                        { "name": "Distributed Denial-of-Service (DDoS)", "key": "G", "ID": "721" },
                        { "name": "None", "key": "H", "ID": "722" },
                        { "name": "I don't know", "key": "I", "ID": "723" }
                    ]
                }
            ]
        }
        , {
            "card": "Hosted Server",
            "questions": [
                {
                    "question": "Do you have hosted servers with operating systems that are no longer supported (like Windows Server 2008 and older)?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "724" },
                        { "name": "No", "key": "B", "ID": "725" },
                        { "name": "Partially", "key": "C", "ID": "726" },
                        { "name": "I don't know", "key": "D", "ID": "727" }
                    ]
                },
                {
                    "question": "For your unsupported servers, please select all server protection tools used.",
                    "options": [
                        { "name": "Network segmentation", "key": "A", "ID": "728" },
                        { "name": "Logging and monitoring", "key": "B", "ID": "729" },
                        { "name": "None", "key": "C", "ID": "730" },
                        { "name": "I don't know", "key": "D", "ID": "731" }
                    ]
                },
                {
                    "question": "Which tools and techniques are used to protect your company's hosted servers?",
                    "options": [
                        { "name": "Account default credentials are modified", "key": "A", "ID": "732" },
                        { "name": "Only approved software is installed", "key": "B", "ID": "733" },
                        { "name": "User lockout after several failed login attempts", "key": "C", "ID": "734" },
                        { "name": "Limited access for admins only", "key": "D", "ID": "735" },
                        { "name": "Disable autorun and autoplay services", "key": "E", "ID": "736" },
                        { "name": "Strong password access protection", "key": "F", "ID": "737" },
                        { "name": "Anti-malware scan to connected removable media", "key": "G", "ID": "738" },
                        { "name": "Host-based firewall", "key": "H", "ID": "739" },
                        { "name": "Periodic application patching", "key": "I", "ID": "740" },
                        { "name": "Disabling of unnecessary services", "key": "J", "ID": "741" },
                        { "name": "Server communication is encrypted", "key": "K", "ID": "742" },
                        { "name": "Advanced Endpoint Protection (EDR)", "key": "L", "ID": "743" },
                        { "name": "Periodic OS patching for OS supported servers", "key": "M", "ID": "744" },
                        { "name": "Antivirus and/or antimalware protection", "key": "N", "ID": "745" },
                        { "name": "None", "key": "O", "ID": "746" },
                        { "name": "I don't know", "key": "P", "ID": "747" }
                    ]
                }
            ]
        }
        , {
            "card": "Human Resources",
            "questions": [
                {
                    "question": "Are employment security background checks and preparations being carried out by the company?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "748" },
                        { "name": "No", "key": "B", "ID": "749" },
                        { "name": "Partially", "key": "C", "ID": "750" },
                        { "name": "I don't know", "key": "D", "ID": "751" }
                    ]
                },
                {
                    "question": "Does HR always notify IT when an employee is terminated so that IT can revoke their authorizations?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "752" },
                        { "name": "No", "key": "B", "ID": "753" },
                        { "name": "Partially", "key": "C", "ID": "754" },
                        { "name": "I don't know", "key": "D", "ID": "755" }
                    ]
                },
                {
                    "question": "Does HR always notify IT when an employee's role changes?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "756" },
                        { "name": "No", "key": "B", "ID": "757" },
                        { "name": "Partially", "key": "C", "ID": "758" },
                        { "name": "I don't know", "key": "D", "ID": "759" }
                    ]
                },
                {
                    "question": "Does HR organization conduct regular reviews of the organization, update roles, and responsibilities, and provide suitable training to help employees enhance their skills according to their job duties and the company's goals?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "760" },
                        { "name": "No", "key": "B", "ID": "761" },
                        { "name": "Partially", "key": "C", "ID": "762" },
                        { "name": "I don't know", "key": "D", "ID": "763" }
                    ]
                },
                {
                    "question": "Does your HR organization ensure clearly defined roles and responsibilities?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "764" },
                        { "name": "No", "key": "B", "ID": "765" },
                        { "name": "Partially", "key": "C", "ID": "766" },
                        { "name": "I don't know", "key": "D", "ID": "767" }
                    ]
                },
                {
                    "question": "Is there a procedure for sanctioning an employee anytime a cyber policy is breached?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "768" },
                        { "name": "No", "key": "B", "ID": "769" },
                        { "name": "Partially", "key": "C", "ID": "770" },
                        { "name": "I don't know", "key": "D", "ID": "771" }
                    ]
                },
                {
                    "question": "Is there a user policy in place that outlines cybersecurity responsibilities and expectations?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "772" },
                        { "name": "No", "key": "B", "ID": "773" },
                        { "name": "Partially", "key": "C", "ID": "774" },
                        { "name": "I don't know", "key": "D", "ID": "775" }
                    ]
                },
                {
                    "question": "Is your organization currently employing mechanisms to ensure individual accountability for their duties?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "776" },
                        { "name": "No", "key": "B", "ID": "777" },
                        { "name": "Partially", "key": "C", "ID": "778" },
                        { "name": "I don't know", "key": "D", "ID": "779" }
                    ]
                },
                {
                    "question": "Which cybersecurity-related clauses are included in employment contracts?",
                    "options": [
                        { "name": "Non-Disclosure Agreement (NDA)", "key": "A", "ID": "780" },
                        { "name": "Post-employment requirements", "key": "B", "ID": "781" },
                        { "name": "Rules and procedures of a clean desk and unattended equipment", "key": "C", "ID": "782" },
                        { "name": "Acceptable behavior for information and system usage", "key": "D", "ID": "783" },
                        { "name": "Ability to investigate employee misconduct", "key": "E", "ID": "784" },
                        { "name": "None", "key": "F", "ID": "785" },
                        { "name": "I don't know", "key": "G", "ID": "786" }
                    ]
                }
            ]
        }
        , {
            "card": "Incident Response",
            "questions": [
                {
                    "question": "Does the company have a process of notifying all internal and external stakeholders and relevant regulators of a cybersecurity incident?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "787" },
                        { "name": "No", "key": "B", "ID": "788" },
                        { "name": "Partially", "key": "C", "ID": "789" },
                        { "name": "I don't know", "key": "D", "ID": "790" }
                    ]
                },
                {
                    "question": "Has the company ever faced a cybersecurity incident?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "791" },
                        { "name": "No", "key": "B", "ID": "792" },
                        { "name": "Partially", "key": "C", "ID": "793" },
                        { "name": "I don't know", "key": "D", "ID": "794" }
                    ]
                },
                {
                    "question": "Has the company performed activities to conclude and improve incident response processes after a successful cyber attack?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "795" },
                        { "name": "No", "key": "B", "ID": "796" },
                        { "name": "Partially", "key": "C", "ID": "797" },
                        { "name": "I don't know", "key": "D", "ID": "798" }
                    ]
                },
                {
                    "question": "Which tools and procedures does your company have to detect and investigate a cybersecurity incident?",
                    "options": [
                        { "name": "Incident classification and alert threshold", "key": "A", "ID": "799" },
                        { "name": "An Endpoint Protection and Response tool (EDR)", "key": "B", "ID": "800" },
                        { "name": "Log collection of system and network events", "key": "C", "ID": "801" },
                        { "name": "None", "key": "D", "ID": "802" },
                        { "name": "I don't know", "key": "E", "ID": "803" }
                    ]
                },
                {
                    "question": "Which tools and procedures does your company have to ensure the successful handling of security incidents?",
                    "options": [
                        { "name": "Containing incidents and preventing expansion", "key": "A", "ID": "804" },
                        { "name": "Sanctioning of individuals involved in unauthorized use or disclosure of personal information", "key": "B", "ID": "805" },
                        { "name": "Execution of response procedures according to the incident response plan", "key": "C", "ID": "806" },
                        { "name": "Contingency plans for mitigating cybersecurity incidents", "key": "D", "ID": "807" },
                        { "name": "Analyzing incidents as they occur", "key": "E", "ID": "808" },
                        { "name": "Improvement of detection and prevention tools and techniques after a cyber incident has occurred", "key": "F", "ID": "809" },
                        { "name": "None", "key": "G", "ID": "810" },
                        { "name": "I don't know", "key": "H", "ID": "811" }
                    ]
                },
                {
                    "question": "Which tools and procedures does your company use to prepare for a cybersecurity incident?",
                    "options": [
                        { "name": "An incident response plan", "key": "A", "ID": "812" },
                        { "name": "Predefined incident response roles within the company", "key": "B", "ID": "813" },
                        { "name": "Employee incident awareness training", "key": "C", "ID": "814" },
                        { "name": "Documented network topology and asset inventory", "key": "D", "ID": "815" },
                        { "name": "Management commitment to the company's IR plan", "key": "E", "ID": "816" },
                        { "name": "Engagement of a third-party IR team", "key": "F", "ID": "817" },
                        { "name": "Incident response practice sessions", "key": "G", "ID": "818" },
                        { "name": "None", "key": "H", "ID": "819" },
                        { "name": "I don't know", "key": "I", "ID": "820" }
                    ]
                }
            ]
        }
        , {
            "card": "Information Security Management",
            "questions": [
                {
                    "question": "Did your company identify all persons of interest who may be affected by information security related issues?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "821" },
                        { "name": "No", "key": "B", "ID": "822" },
                        { "name": "Partially", "key": "C", "ID": "823" },
                        { "name": "I don't know", "key": "D", "ID": "824" }
                    ]
                },
                {
                    "question": "Do cybersecurity demands align with business goals to guarantee that security measures effectively bolster and improve business activities?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "825" },
                        { "name": "No", "key": "B", "ID": "826" },
                        { "name": "Partially", "key": "C", "ID": "827" },
                        { "name": "I don't know", "key": "D", "ID": "828" }
                    ]
                },
                {
                    "question": "Does company management approve the cybersecurity plan?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "829" },
                        { "name": "No", "key": "B", "ID": "830" },
                        { "name": "Partially", "key": "C", "ID": "831" },
                        { "name": "I don't know", "key": "D", "ID": "832" }
                    ]
                },
                {
                    "question": "Does management define roles and responsibilities for all information related security issues?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "833" },
                        { "name": "No", "key": "B", "ID": "834" },
                        { "name": "Partially", "key": "C", "ID": "835" },
                        { "name": "I don't know", "key": "D", "ID": "836" }
                    ]
                },
                {
                    "question": "Does the company collect and use high-quality, relevant information to strengthen its cybersecurity measures?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "837" },
                        { "name": "No", "key": "B", "ID": "838" },
                        { "name": "Partially", "key": "C", "ID": "839" },
                        { "name": "I don't know", "key": "D", "ID": "840" }
                    ]
                },
                {
                    "question": "Does the company review and approve the company cybersecurity policies on an annual basis?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "841" },
                        { "name": "No", "key": "B", "ID": "842" },
                        { "name": "Partially", "key": "C", "ID": "843" },
                        { "name": "I don't know", "key": "D", "ID": "844" }
                    ]
                },
                {
                    "question": "Does your company create and follow a prioritized cybersecurity plan?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "845" },
                        { "name": "No", "key": "B", "ID": "846" },
                        { "name": "Partially", "key": "C", "ID": "847" },
                        { "name": "I don't know", "key": "D", "ID": "848" }
                    ]
                },
                {
                    "question": "Does your company have a set of cybersecurity policies?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "849" },
                        { "name": "No", "key": "B", "ID": "850" },
                        { "name": "Partially", "key": "C", "ID": "851" },
                        { "name": "I don't know", "key": "D", "ID": "852" }
                    ]
                },
                {
                    "question": "Has the company hold a set of KPI's to manage and improve the cybersecurity plan?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "853" },
                        { "name": "No", "key": "B", "ID": "854" },
                        { "name": "Partially", "key": "C", "ID": "855" },
                        { "name": "I don't know", "key": "D", "ID": "856" }
                    ]
                },
                {
                    "question": "Has the company published a formal business model and key objectives in which cybersecurity priorities and threats are defined?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "857" },
                        { "name": "No", "key": "B", "ID": "858" },
                        { "name": "Partially", "key": "C", "ID": "859" },
                        { "name": "I don't know", "key": "D", "ID": "860" }
                    ]
                },
                {
                    "question": "Has the company set an organizational structure which includes relevant stakeholders in key positions and/or appointed a board of directors?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "861" },
                        { "name": "No", "key": "B", "ID": "862" },
                        { "name": "Partially", "key": "C", "ID": "863" },
                        { "name": "I don't know", "key": "D", "ID": "864" }
                    ]
                },
                {
                    "question": "Has your organization set up efficient ways to share cybersecurity information with relevant internal and external parties?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "865" },
                        { "name": "No", "key": "B", "ID": "866" },
                        { "name": "Partially", "key": "C", "ID": "867" },
                        { "name": "I don't know", "key": "D", "ID": "868" }
                    ]
                },
                {
                    "question": "Have you identified all the internal and external issues that may affect the company's cybersecurity policy?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "869" },
                        { "name": "No", "key": "B", "ID": "870" },
                        { "name": "Partially", "key": "C", "ID": "871" },
                        { "name": "I don't know", "key": "D", "ID": "872" }
                    ]
                },
                {
                    "question": "Is a cybersecurity program established, approved by senior management and communicated to all employees in a formal manner?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "873" },
                        { "name": "No", "key": "B", "ID": "874" },
                        { "name": "Partially", "key": "C", "ID": "875" },
                        { "name": "I don't know", "key": "D", "ID": "876" }
                    ]
                },
                {
                    "question": "Is management able to obtain information about cyber protection from information-security authorities and special interest groups?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "877" },
                        { "name": "No", "key": "B", "ID": "878" },
                        { "name": "Partially", "key": "C", "ID": "879" },
                        { "name": "I don't know", "key": "D", "ID": "880" }
                    ]
                },
                {
                    "question": "Is the importance of company cybersecurity policies explained to relevant stakeholders?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "881" },
                        { "name": "No", "key": "B", "ID": "882" },
                        { "name": "Partially", "key": "C", "ID": "883" },
                        { "name": "I don't know", "key": "D", "ID": "884" }
                    ]
                },
                {
                    "question": "Is there a designated official who is accountable for cybersecurity in the company?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "885" },
                        { "name": "No", "key": "B", "ID": "886" },
                        { "name": "Partially", "key": "C", "ID": "887" },
                        { "name": "I don't know", "key": "D", "ID": "888" }
                    ]
                }
            ]
        }
        , {
            "card": "Microsoft 365",
            "questions": [
                {
                    "question": "Which of the following IDENTITY setups are configured for Office 365 service in your Microsoft Security Center?",
                    "options": [
                        { "name": "Safe links policies", "key": "A", "ID": "950" },
                        { "name": "User risk policy", "key": "B", "ID": "951" },
                        { "name": "Do not allow users to grant consent to unmanaged applications", "key": "C", "ID": "952" },
                        { "name": "Microsoft Defender for Office 365", "key": "D", "ID": "953" },
                        { "name": "Share exchange online calendar detail", "key": "E", "ID": "954" },
                        { "name": "MFA for all users", "key": "F", "ID": "955" },
                        { "name": "Safe Attachments in block mode", "key": "G", "ID": "956" },
                        { "name": "Legacy authentication block", "key": "H", "ID": "957" },
                        { "name": "MFA for administration", "key": "I", "ID": "958" },
                        { "name": "Customer lockbox feature", "key": "J", "ID": "959" },
                        { "name": "Sign-in risk policy", "key": "K", "ID": "960" },
                        { "name": "Safe Documents for Office Clients", "key": "L", "ID": "961" },
                        { "name": "Partial or None", "key": "M", "ID": "962" },
                        { "name": "I don't know", "key": "N", "ID": "963" },
                        { "name": "None", "key": "O", "ID": "964" }
                    ]
                },
                {
                    "question": "Which additional IDENTITY setups are configured for Office 365 service in your Microsoft Security Center?",
                    "options": [
                        { "name": "Zero-hour auto purge policies for malware", "key": "A", "ID": "965" },
                        { "name": "Password expire policy", "key": "B", "ID": "966" },
                        { "name": "Limited administrative roles", "key": "C", "ID": "967" },
                        { "name": "Zero-hour auto purge policies for phishing messages", "key": "D", "ID": "968" },
                        { "name": "Designate more than one global admin", "key": "E", "ID": "969" },
                        { "name": "Remove TLS 1.0/1.1 and 3DES dependencies", "key": "F", "ID": "970" },
                        { "name": "Attachments filter setting for anti-malware", "key": "G", "ID": "971" },
                        { "name": "Zero-hour auto purge policies for spam messages", "key": "H", "ID": "972" },
                        { "name": "No sender domains allowed for Anti-spam", "key": "I", "ID": "973" },
                        { "name": "Enable self-service password reset", "key": "J", "ID": "974" },
                        { "name": "Partial or None", "key": "K", "ID": "975" },
                        { "name": "I don't know", "key": "L", "ID": "976" }
                    ]
                }
            ]
        }
        , {
            "card": "Onboarding",
            "questions": [
                {
                    "question": "Do you have an on-prem active directory?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "977" },
                        { "name": "No", "key": "B", "ID": "978" }
                    ]
                },
                {
                    "question": "Can employees access the company computers, networks, or applications remotely?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "979" },
                        { "name": "No", "key": "B", "ID": "980" },
                        { "name": "Partially", "key": "C", "ID": "981" },
                        { "name": "I don't know", "key": "D", "ID": "982" }
                    ]
                },
                {
                    "question": "Choose your industry.",
                    "options": [
                        { "name": "Government and Public Sector", "key": "A", "ID": "983" },
                        { "name": "Technology", "key": "B", "ID": "984" },
                        { "name": "Health and Medical", "key": "C", "ID": "985" },
                        { "name": "Insurance and Finance", "key": "D", "ID": "986" },
                        { "name": "Retail and Ecommerce", "key": "E", "ID": "987" },
                        { "name": "Tourism", "key": "F", "ID": "988" },
                        { "name": "Education", "key": "G", "ID": "989" },
                        { "name": "Manufacturing", "key": "H", "ID": "990" },
                        { "name": "Homeland Security", "key": "I", "ID": "991" },
                        { "name": "Professional Services", "key": "J", "ID": "992" },
                        { "name": "Legal", "key": "K", "ID": "993" },
                        { "name": "Other", "key": "L", "ID": "994" }
                    ]
                },
                {
                    "question": "Do you have a website?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "995" },
                        { "name": "No", "key": "B", "ID": "996" },
                        { "name": "Partially", "key": "C", "ID": "997" },
                        { "name": "I don't know", "key": "D", "ID": "998" }
                    ]
                },
                {
                    "question": "Do you maintain on-premise IT infrastructure?",
                    "options": [
                        { "name": "Yes, network only", "key": "A", "ID": "999" },
                        { "name": "Yes, servers only", "key": "B", "ID": "1000" },
                        { "name": "Yes, both network and servers", "key": "C", "ID": "1001" },
                        { "name": "No", "key": "D", "ID": "1002" }
                    ]
                },
                {
                    "question": "Do you save customer payment information in your IT infrastructure?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1003" },
                        { "name": "No", "key": "B", "ID": "1004" },
                        { "name": "Partially", "key": "C", "ID": "1005" },
                        { "name": "I don't know", "key": "D", "ID": "1006" }
                    ]
                },
                {
                    "question": "Do you use cloud providers to host your IT infrastructure?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1007" },
                        { "name": "No", "key": "B", "ID": "1008" }
                    ]
                },
                {
                    "question": "Do you use external hosting services for your IT infrastructure?",
                    "options": [
                        { "name": "Yes, network only", "key": "A", "ID": "1009" },
                        { "name": "Yes, servers only", "key": "B", "ID": "1010" },
                        { "name": "Yes, both network and servers", "key": "C", "ID": "1011" },
                        { "name": "No", "key": "D", "ID": "1012" }
                    ]
                },
                {
                    "question": "Do you use Microsoft 365?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1013" },
                        { "name": "No", "key": "B", "ID": "1014" },
                        { "name": "Partially", "key": "C", "ID": "1015" },
                        { "name": "I don't know", "key": "D", "ID": "1016" }
                    ]
                },
                {
                    "question": "Do you use SaaS products, cloud-based software as a service?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1017" },
                        { "name": "No", "key": "B", "ID": "1018" },
                        { "name": "Partially", "key": "C", "ID": "1019" },
                        { "name": "I don't know", "key": "D", "ID": "1020" }
                    ]
                },
                {
                    "question": "Does your company develop a software product?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1021" },
                        { "name": "No", "key": "B", "ID": "1022" },
                        { "name": "Partially", "key": "C", "ID": "1023" },
                        { "name": "I don't know", "key": "D", "ID": "1024" }
                    ]
                },
                {
                    "question": "How many computer users do you have?",
                    "options": [
                        { "name": "Under 100", "key": "A", "ID": "1025" },
                        { "name": "101-300", "key": "B", "ID": "1026" },
                        { "name": "301-500", "key": "C", "ID": "1027" },
                        { "name": "501-1000", "key": "D", "ID": "1028" },
                        { "name": "More than 1000", "key": "E", "ID": "1029" }
                    ]
                },
                {
                    "question": "Which cloud provider do you use for your IT infrastructure?",
                    "options": [
                        { "name": "Microsoft Azure cloud", "key": "A", "ID": "1030" },
                        { "name": "AWS cloud", "key": "B", "ID": "1031" },
                        { "name": "Google Cloud", "key": "C", "ID": "1032" },
                        { "name": "Oracle Cloud", "key": "D", "ID": "1033" },
                        { "name": "IBM Cloud", "key": "E", "ID": "1034" },
                        { "name": "Other", "key": "F", "ID": "1035" }
                    ]
                },
                {
                    "question": "Which security regulations do you need/want to adhere to?",
                    "options": [
                        { "name": "NIST-CSF", "key": "A", "ID": "1036" },
                        { "name": "CCPA", "key": "B", "ID": "1037" },
                        { "name": "CIS v8", "key": "C", "ID": "1038" },
                        { "name": "SEC compliance", "key": "D", "ID": "1039" },
                        { "name": "PCI/DSS", "key": "E", "ID": "1040" },
                        { "name": "FTC Safeguards Rule", "key": "F", "ID": "1041" },
                        { "name": "GDPR", "key": "G", "ID": "1042" },
                        { "name": "ISO 27001 2022", "key": "H", "ID": "1043" }
                    ]
                },
                {
                    "question": "Who manages your IT, security systems, and infrastructure?",
                    "options": [
                        { "name": "MSP - a Managed Service Provider", "key": "A", "ID": "1044" },
                        { "name": "MSSP - a Managed Security Service Provider", "key": "B", "ID": "1045" },
                        { "name": "Internal IT staff", "key": "C", "ID": "1046" },
                        { "name": "Generalist non-IT staff", "key": "D", "ID": "1047" },
                        { "name": "Other", "key": "E", "ID": "1048" }
                    ]
                }
            ]
        }
        , {
            "card": "On-Premises Network",
            "questions": [
                {
                    "question": "Are all company sites firewall secured and all communications between sites encrypted?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1049" },
                        { "name": "No", "key": "B", "ID": "1050" },
                        { "name": "Partially", "key": "C", "ID": "1051" },
                        { "name": "I don't know", "key": "D", "ID": "1052" }
                    ]
                },
                {
                    "question": "Are internet-facing firewalls being used to protect company on-premise networks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1053" },
                        { "name": "No", "key": "B", "ID": "1054" },
                        { "name": "Partially", "key": "C", "ID": "1055" },
                        { "name": "I don't know", "key": "D", "ID": "1056" }
                    ]
                },
                {
                    "question": "Are there dedicated workstations and network segments assigned for administrative tasks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1057" },
                        { "name": "No", "key": "B", "ID": "1058" },
                        { "name": "Partially", "key": "C", "ID": "1059" },
                        { "name": "I don't know", "key": "D", "ID": "1060" }
                    ]
                },
                {
                    "question": "By what means can user accounts remotely access the company network?",
                    "options": [
                        { "name": "Using two-factor authentication", "key": "A", "ID": "1061" },
                        { "name": "Using a VPN or a solution that employs a VPN", "key": "B", "ID": "1062" },
                        { "name": "Using externally exposed Windows Remote Desktop (RDP)", "key": "C", "ID": "1063" },
                        { "name": "None", "key": "D", "ID": "1064" },
                        { "name": "I don't know", "key": "E", "ID": "1065" }
                    ]
                },
                {
                    "question": "Do you allow non-employees (guests) to connect to your Wi-Fi network?",
                    "options": [
                        { "name": "Yes, using the company Wi-Fi", "key": "A", "ID": "1066" },
                        { "name": "Yes, using a separate guest Wi-Fi network", "key": "B", "ID": "1067" },
                        { "name": "No", "key": "C", "ID": "1068" },
                        { "name": "I don't know", "key": "D", "ID": "1069" }
                    ]
                },
                {
                    "question": "Do you support private Wi-Fi access to your network?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1070" },
                        { "name": "No", "key": "B", "ID": "1071" },
                        { "name": "Partially", "key": "C", "ID": "1072" },
                        { "name": "I don't know", "key": "D", "ID": "1073" }
                    ]
                },
                {
                    "question": "Does your company have multiple physical sites with local networks?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1074" },
                        { "name": "No", "key": "B", "ID": "1075" },
                        { "name": "Partially", "key": "C", "ID": "1076" },
                        { "name": "I don't know", "key": "D", "ID": "1077" }
                    ]
                },
                {
                    "question": "How do you secure your Wi-Fi access?",
                    "options": [
                        { "name": "WPS and DHCP are disabled", "key": "A", "ID": "1078" },
                        { "name": "Firmware is updated regularly", "key": "B", "ID": "1079" },
                        { "name": "The default network name (SSID) has been changed", "key": "C", "ID": "1080" },
                        { "name": "The default login and password have been changed", "key": "D", "ID": "1081" },
                        { "name": "An internal firewall is activated", "key": "E", "ID": "1082" },
                        { "name": "User authentication is required to access the Wi-Fi network", "key": "F", "ID": "1083" },
                        { "name": "Only WPA2/3 encryption is used", "key": "G", "ID": "1084" },
                        { "name": "The Wi-Fi router is physically located at a secure location", "key": "H", "ID": "1085" },
                        { "name": "None", "key": "I", "ID": "1086" },
                        { "name": "I don't know", "key": "J", "ID": "1087" }
                    ]
                },
                {
                    "question": "Is remote connectivity to company network allowed in cases such as teleworking?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1088" },
                        { "name": "No", "key": "B", "ID": "1089" },
                        { "name": "Partially", "key": "C", "ID": "1090" },
                        { "name": "I don't know", "key": "D", "ID": "1091" }
                    ]
                },
                {
                    "question": "Is there a procedure to ensure a secure network infrastructure management?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1092" },
                        { "name": "No", "key": "B", "ID": "1093" },
                        { "name": "Partially", "key": "C", "ID": "1094" },
                        { "name": "I don't know", "key": "D", "ID": "1095" }
                    ]
                },
                {
                    "question": "Please select all network device protection methods used by your company at your on-premises network.",
                    "options": [
                        { "name": "Firewall logs are saved", "key": "A", "ID": "1096" },
                        { "name": "Regularly patched", "key": "B", "ID": "1097" },
                        { "name": "Logs are continuously monitored", "key": "C", "ID": "1098" },
                        { "name": "Firewalls are hardened", "key": "D", "ID": "1099" },
                        { "name": "Only necessary ports are exposed", "key": "E", "ID": "1100" },
                        { "name": "Hardware is securely stored", "key": "F", "ID": "1101" },
                        { "name": "Physically accessible only to authorized personnel", "key": "G", "ID": "1102" },
                        { "name": "High-severity firewall alerts are monitored", "key": "H", "ID": "1103" },
                        { "name": "None", "key": "I", "ID": "1104" },
                        { "name": "I don't know", "key": "J", "ID": "1105" }
                    ]
                },
                {
                    "question": "Please select other network protection used by your company on-premises.",
                    "options": [
                        { "name": "Web filtering tools for Internet access", "key": "A", "ID": "1106" },
                        { "name": "Network segmentation", "key": "B", "ID": "1107" },
                        { "name": "Network Access Control (NAC)", "key": "C", "ID": "1108" },
                        { "name": "Distributed Denial-of-Service (DDoS)", "key": "D", "ID": "1109" },
                        { "name": "Network traffic anomaly detection", "key": "E", "ID": "1110" },
                        { "name": "Network Address Translation (NAT)", "key": "F", "ID": "1111" },
                        { "name": "Switches configurations hardening", "key": "G", "ID": "1112" },
                        { "name": "None", "key": "H", "ID": "1113" },
                        { "name": "I don't know", "key": "I", "ID": "1114" }
                    ]
                }
            ]
        }
        , {
            "card": "On-Premises Server",
            "questions": [
                {
                    "question": "Do you have on-premise servers with operating systems that are no longer supported (such as Windows Server 2008 and older)?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1115" },
                        { "name": "No", "key": "B", "ID": "1116" },
                        { "name": "Partially", "key": "C", "ID": "1117" },
                        { "name": "I don't know", "key": "D", "ID": "1118" }
                    ]
                },
                {
                    "question": "Which tools and techniques are used to protect all on-premises company servers?",
                    "options": [
                        { "name": "Disable autorun and autoplay services", "key": "A", "ID": "1119" },
                        { "name": "Host-based firewall", "key": "B", "ID": "1120" },
                        { "name": "Advanced Endpoint Protection (EDR)", "key": "C", "ID": "1121" },
                        { "name": "Limited access for admins only", "key": "D", "ID": "1122" },
                        { "name": "User lockout after several failed login attempts", "key": "E", "ID": "1123" },
                        { "name": "Account default credentials are modified", "key": "F", "ID": "1124" },
                        { "name": "Periodic application patching", "key": "G", "ID": "1125" },
                        { "name": "Disabling of unnecessary services", "key": "H", "ID": "1126" },
                        { "name": "Periodic OS patching for OS supported servers", "key": "I", "ID": "1127" },
                        { "name": "Anti-malware scanning of connected removable media", "key": "J", "ID": "1128" },
                        { "name": "Server communication protection", "key": "K", "ID": "1129" },
                        { "name": "Antivirus and/or antimalware protection", "key": "L", "ID": "1130" },
                        { "name": "Strong password access protection", "key": "M", "ID": "1131" },
                        { "name": "Only approved software is installed", "key": "N", "ID": "1132" },
                        { "name": "None", "key": "O", "ID": "1133" },
                        { "name": "I don't know", "key": "P", "ID": "1134" }
                    ]
                }
            ]
        }, {
            "card": "Operational and Maintenance",
            "questions": [
                {
                    "question": "Are facility and infrastructure operating procedures documented and made available to all users who need them?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1135" },
                        { "name": "No", "key": "B", "ID": "1136" },
                        { "name": "Partially", "key": "C", "ID": "1137" },
                        { "name": "I don't know", "key": "D", "ID": "1138" }
                    ]
                },
                {
                    "question": "Are hardware infrastructure and equipment maintenance activities controlled whether being performed on-site or remotely?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1139" },
                        { "name": "No", "key": "B", "ID": "1140" },
                        { "name": "Partially", "key": "C", "ID": "1141" },
                        { "name": "I don't know", "key": "D", "ID": "1142" },
                        { "name": "Not Applicable", "key": "E", "ID": "1143" }
                    ]
                },
                {
                    "question": "Are hardware infrastructure and equipment maintenance activities scheduled, performed, and procedures documented in accordance with manufacturer specifications?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1144" },
                        { "name": "No", "key": "B", "ID": "1145" },
                        { "name": "Partially", "key": "C", "ID": "1146" },
                        { "name": "I don't know", "key": "D", "ID": "1147" },
                        { "name": "Not Applicable", "key": "E", "ID": "1148" }
                    ]
                },
                {
                    "question": "Are known vulnerabilities remediated before systems are put into production?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1149" },
                        { "name": "No", "key": "B", "ID": "1150" },
                        { "name": "Partially", "key": "C", "ID": "1151" },
                        { "name": "I don't know", "key": "D", "ID": "1152" }
                    ]
                },
                {
                    "question": "Are maintenance personnel's activities supervised?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1153" },
                        { "name": "No", "key": "B", "ID": "1154" },
                        { "name": "Partially", "key": "C", "ID": "1155" },
                        { "name": "I don't know", "key": "D", "ID": "1156" },
                        { "name": "Not Applicable", "key": "E", "ID": "1157" }
                    ]
                },
                {
                    "question": "Are new systems and applications tested for functionality before being put into production?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1158" },
                        { "name": "No", "key": "B", "ID": "1159" },
                        { "name": "Partially", "key": "C", "ID": "1160" },
                        { "name": "I don't know", "key": "D", "ID": "1161" }
                    ]
                },
                {
                    "question": "Are security requirements documented for each stage of the system development lifecycle (Planning, Design, Acquisition, Implementation, Maintenance, and Disposal)?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1162" },
                        { "name": "No", "key": "B", "ID": "1163" },
                        { "name": "Partially", "key": "C", "ID": "1164" },
                        { "name": "I don't know", "key": "D", "ID": "1165" }
                    ]
                },
                {
                    "question": "Are separate environments used for development, and production?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1166" },
                        { "name": "No", "key": "B", "ID": "1167" },
                        { "name": "Partially", "key": "C", "ID": "1168" },
                        { "name": "I don't know", "key": "D", "ID": "1169" }
                    ]
                },
                {
                    "question": "Are system maintenance records kept, and do they include at least the date, name of the individual performing the maintenance, a description of the work performed, and a list of assets or parts of assets replaced or removed?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1170" },
                        { "name": "No", "key": "B", "ID": "1171" },
                        { "name": "Partially", "key": "C", "ID": "1172" },
                        { "name": "I don't know", "key": "D", "ID": "1173" },
                        { "name": "Not Applicable", "key": "E", "ID": "1174" }
                    ]
                },
                {
                    "question": "Are test accounts and test data removed before the systems become active?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1175" },
                        { "name": "No", "key": "B", "ID": "1176" },
                        { "name": "Partially", "key": "C", "ID": "1177" },
                        { "name": "I don't know", "key": "D", "ID": "1178" }
                    ]
                },
                {
                    "question": "Do all systems and software have the latest vendor-supplied security patches installed?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1179" },
                        { "name": "No", "key": "B", "ID": "1180" },
                        { "name": "Partially", "key": "C", "ID": "1181" },
                        { "name": "I don't know", "key": "D", "ID": "1182" }
                    ]
                },
                {
                    "question": "Do systems have layered protections so that if one system fails, another will still protect (Defense-in-Depth)?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1183" },
                        { "name": "No", "key": "B", "ID": "1184" },
                        { "name": "Partially", "key": "C", "ID": "1185" },
                        { "name": "I don't know", "key": "D", "ID": "1186" }
                    ]
                },
                {
                    "question": "Does remote access to company systems for maintenance require Multi-Factor Authentication?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1187" },
                        { "name": "No", "key": "B", "ID": "1188" },
                        { "name": "Partially", "key": "C", "ID": "1189" },
                        { "name": "I don't know", "key": "D", "ID": "1190" }
                    ]
                },
                {
                    "question": "Does the organization determine the essential security measures of operational systems and allocate resources for ensuring safety and compliance?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1191" },
                        { "name": "No", "key": "B", "ID": "1192" },
                        { "name": "Partially", "key": "C", "ID": "1193" },
                        { "name": "I don't know", "key": "D", "ID": "1194" }
                    ]
                },
                {
                    "question": "Does the organization do capacity planning and monitoring to ensure systems meet business objectives?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1195" },
                        { "name": "No", "key": "B", "ID": "1196" },
                        { "name": "Partially", "key": "C", "ID": "1197" },
                        { "name": "I don't know", "key": "D", "ID": "1198" }
                    ]
                },
                {
                    "question": "Does the organization evaluate and implement security controls to protect operational systems and related sensitive information?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1199" },
                        { "name": "No", "key": "B", "ID": "1200" },
                        { "name": "Partially", "key": "C", "ID": "1201" },
                        { "name": "I don't know", "key": "D", "ID": "1202" }
                    ]
                },
                {
                    "question": "Does the organization's capacity planning process consider future capacity needs of the business?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1203" },
                        { "name": "No", "key": "B", "ID": "1204" },
                        { "name": "Partially", "key": "C", "ID": "1205" },
                        { "name": "I don't know", "key": "D", "ID": "1206" }
                    ]
                },
                {
                    "question": "Has the organization set up procedures to manage and communicate information for operational systems and processes?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1207" },
                        { "name": "No", "key": "B", "ID": "1208" },
                        { "name": "Partially", "key": "C", "ID": "1209" },
                        { "name": "I don't know", "key": "D", "ID": "1210" }
                    ]
                },
                {
                    "question": "Has your company put in place approved methods to confirm that system inputs, processing, and outputs are complete, accurate, and authorized?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1211" },
                        { "name": "No", "key": "B", "ID": "1212" },
                        { "name": "Partially", "key": "C", "ID": "1213" },
                        { "name": "I don't know", "key": "D", "ID": "1214" }
                    ]
                },
                {
                    "question": "Have appropriate integrity-checking mechanisms been implemented for verifying the integrity of both in-house and third-party software, firmware, hardware, and information in the organization?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1215" },
                        { "name": "No", "key": "B", "ID": "1216" },
                        { "name": "Partially", "key": "C", "ID": "1217" },
                        { "name": "I don't know", "key": "D", "ID": "1218" }
                    ]
                },
                {
                    "question": "In which of the following ways is the organization's IT architecture aligned with business objectives?",
                    "options": [
                        { "name": "Used to align technology roadmap with business goals", "key": "A", "ID": "1219" },
                        { "name": "Aligned with industry-recognized practices such as TOGAF, ITIL OR ISO 19439", "key": "B", "ID": "1220" },
                        { "name": "Allows for security and compliance to be included in IT Architecture planning", "key": "C", "ID": "1221" },
                        { "name": "None", "key": "D", "ID": "1222" },
                        { "name": "I don't know", "key": "E", "ID": "1223" }
                    ]
                },
                {
                    "question": "Is information security included in all project management plans, regardless of the type of the project?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1224" },
                        { "name": "No", "key": "B", "ID": "1225" },
                        { "name": "Partially", "key": "C", "ID": "1226" },
                        { "name": "I don't know", "key": "D", "ID": "1227" }
                    ]
                },
                {
                    "question": "Is the installation of software restricted on all operational systems?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1228" },
                        { "name": "No", "key": "B", "ID": "1229" },
                        { "name": "Partially", "key": "C", "ID": "1230" },
                        { "name": "I don't know", "key": "D", "ID": "1231" }
                    ]
                },
                {
                    "question": "Is the use of production data for testing or development prohibited?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1232" },
                        { "name": "No", "key": "B", "ID": "1233" },
                        { "name": "Partially", "key": "C", "ID": "1234" },
                        { "name": "I don't know", "key": "D", "ID": "1235" }
                    ]
                },
                {
                    "question": "Is there a separation of duties between development and production environments?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1236" },
                        { "name": "No", "key": "B", "ID": "1237" },
                        { "name": "Partially", "key": "C", "ID": "1238" },
                        { "name": "I don't know", "key": "D", "ID": "1239" }
                    ]
                }
            ]
        }
        , {
            "card": "Passwords and Secrets",
            "questions": [
                {
                    "question": "Are employees using a password management tool?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1240" },
                        { "name": "No", "key": "B", "ID": "1241" },
                        { "name": "Partially", "key": "C", "ID": "1242" },
                        { "name": "I don't know", "key": "D", "ID": "1243" }
                    ]
                },
                {
                    "question": "Do you enforce your password policy on all company assets?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1244" },
                        { "name": "No", "key": "B", "ID": "1245" },
                        { "name": "Partially", "key": "C", "ID": "1246" },
                        { "name": "I don't know", "key": "D", "ID": "1247" }
                    ]
                },
                {
                    "question": "Does an elaborate policy and its corresponding management process exist for ensuring the secure handling, storage, and lifecycle management of passwords and confidential authentication information?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1248" },
                        { "name": "No", "key": "B", "ID": "1249" },
                        { "name": "Partially", "key": "C", "ID": "1250" },
                        { "name": "I don't know", "key": "D", "ID": "1251" }
                    ]
                },
                {
                    "question": "What are the technical requirements for your company's password policy?",
                    "options": [
                        { "name": "Password rotation every 6 months", "key": "A", "ID": "1252" },
                        { "name": "Limit User password change to once a day (minimal password age)", "key": "B", "ID": "1253" },
                        { "name": "Limit user reuse of old passwords (password history) to 20 last known", "key": "C", "ID": "1254" },
                        { "name": "Initial default passwords must be changed on first login", "key": "D", "ID": "1255" },
                        { "name": "A combination of letters, symbols and numbers", "key": "E", "ID": "1256" },
                        { "name": "At least 10 characters", "key": "F", "ID": "1257" },
                        { "name": "Passwords are never delivered to users via email", "key": "G", "ID": "1258" },
                        { "name": "None", "key": "H", "ID": "1259" },
                        { "name": "I don't know", "key": "I", "ID": "1260" }
                    ]
                }
            ]
        }
        , {
            "card": "Physical Infrastructure",
            "questions": [
                {
                    "question": "Are video surveillance systems deployed in strategic locations within company facilities, and is access to recorded footage limited to authorized personnel?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1261" },
                        { "name": "No", "key": "B", "ID": "1262" },
                        { "name": "Partially", "key": "C", "ID": "1263" },
                        { "name": "I don't know", "key": "D", "ID": "1264" }
                    ]
                },
                {
                    "question": "Have alarm systems been installed, maintained, and are response procedures established for alarm events in critical areas?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1265" },
                        { "name": "No", "key": "B", "ID": "1266" },
                        { "name": "Partially", "key": "C", "ID": "1267" },
                        { "name": "I don't know", "key": "D", "ID": "1268" }
                    ]
                },
                {
                    "question": "How are company IT assets physically protected?",
                    "options": [
                        { "name": "Printers require a personal card for printing", "key": "A", "ID": "1269" },
                        { "name": "Physical access control to servers and communication areas", "key": "B", "ID": "1270" },
                        { "name": "Protection procedures for removable and portable media exist", "key": "C", "ID": "1271" },
                        { "name": "Physical security measures for IT equipment", "key": "D", "ID": "1272" },
                        { "name": "Physical & digital access devices are managed and tracked", "key": "E", "ID": "1273" },
                        { "name": "None", "key": "F", "ID": "1274" },
                        { "name": "I don't know", "key": "G", "ID": "1275" }
                    ]
                },
                {
                    "question": "Which measures are implemented to control physical access to your company's site?",
                    "options": [
                        { "name": "An up-to-date list of individuals authorized to enter your premises", "key": "A", "ID": "1276" },
                        { "name": "Secure areas are protected", "key": "B", "ID": "1277" },
                        { "name": "Delivery and loading area protection", "key": "C", "ID": "1278" },
                        { "name": "Physical access controls at all entrance points", "key": "D", "ID": "1279" },
                        { "name": "All visitors are recorded upon entry", "key": "E", "ID": "1280" },
                        { "name": "None", "key": "F", "ID": "1281" },
                        { "name": "I don't know", "key": "G", "ID": "1282" }
                    ]
                }
            ]
        }
        , {
            "card": "Privacy",
            "questions": [
                {
                    "question": "Can users choose whether or not to give their permission for their personal information to be used?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1283" },
                        { "name": "No", "key": "B", "ID": "1284" },
                        { "name": "Partially", "key": "C", "ID": "1285" },
                        { "name": "I don't know", "key": "D", "ID": "1286" }
                    ]
                },
                {
                    "question": "Are disclosures of personal information documented and communicated to the data subject?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1287" },
                        { "name": "No", "key": "B", "ID": "1288" },
                        { "name": "Partially", "key": "C", "ID": "1289" },
                        { "name": "I don't know", "key": "D", "ID": "1290" }
                    ]
                },
                {
                    "question": "Are flaws in personal data identified and corrected as the data is collected, used, or processed?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1291" },
                        { "name": "No", "key": "B", "ID": "1292" },
                        { "name": "Partially", "key": "C", "ID": "1293" },
                        { "name": "I don't know", "key": "D", "ID": "1294" }
                    ]
                },
                {
                    "question": "Are individuals notified after there are corrections or additions to their personal data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1295" },
                        { "name": "No", "key": "B", "ID": "1296" },
                        { "name": "Partially", "key": "C", "ID": "1297" },
                        { "name": "I don't know", "key": "D", "ID": "1298" }
                    ]
                },
                {
                    "question": "Are individuals responsible for personal data management identified and documented?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1299" },
                        { "name": "No", "key": "B", "ID": "1300" },
                        { "name": "Partially", "key": "C", "ID": "1301" },
                        { "name": "I don't know", "key": "D", "ID": "1302" }
                    ]
                },
                {
                    "question": "Can individuals request to erase their personal data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1303" },
                        { "name": "No", "key": "B", "ID": "1304" },
                        { "name": "Partially", "key": "C", "ID": "1305" },
                        { "name": "I don't know", "key": "D", "ID": "1306" }
                    ]
                },
                {
                    "question": "Can people withdraw their permission for their personal data to be used?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1307" },
                        { "name": "No", "key": "B", "ID": "1308" },
                        { "name": "Partially", "key": "C", "ID": "1309" },
                        { "name": "I don't know", "key": "D", "ID": "1310" }
                    ]
                },
                {
                    "question": "Can personal data be exported?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1311" },
                        { "name": "No", "key": "B", "ID": "1312" },
                        { "name": "Partially", "key": "C", "ID": "1313" },
                        { "name": "I don't know", "key": "D", "ID": "1314" }
                    ]
                },
                {
                    "question": "Can personal data be made de-identified or anonymized?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1315" },
                        { "name": "No", "key": "B", "ID": "1316" },
                        { "name": "Partially", "key": "C", "ID": "1317" },
                        { "name": "I don't know", "key": "D", "ID": "1318" }
                    ]
                },
                {
                    "question": "Can users choose not to have their data sold?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1319" },
                        { "name": "No", "key": "B", "ID": "1320" },
                        { "name": "Partially", "key": "C", "ID": "1321" },
                        { "name": "I don't know", "key": "D", "ID": "1322" }
                    ]
                },
                {
                    "question": "Do users need to give their permission before personal data can be used?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1323" },
                        { "name": "No", "key": "B", "ID": "1324" },
                        { "name": "Partially", "key": "C", "ID": "1325" },
                        { "name": "I don't know", "key": "D", "ID": "1326" }
                    ]
                },
                {
                    "question": "Do users receive information about how their data will be used for specific purposes?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1327" },
                        { "name": "No", "key": "B", "ID": "1328" },
                        { "name": "Partially", "key": "C", "ID": "1329" },
                        { "name": "I don't know", "key": "D", "ID": "1330" }
                    ]
                },
                {
                    "question": "Do you classify personal data according to sensitivity and data types?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1331" },
                        { "name": "No", "key": "B", "ID": "1332" },
                        { "name": "Partially", "key": "C", "ID": "1333" },
                        { "name": "I don't know", "key": "D", "ID": "1334" }
                    ]
                },
                {
                    "question": "Do you include the collection of personal data in employee awareness training?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1335" },
                        { "name": "No", "key": "B", "ID": "1336" },
                        { "name": "Partially", "key": "C", "ID": "1337" },
                        { "name": "I don't know", "key": "D", "ID": "1338" }
                    ]
                },
                {
                    "question": "Do you maintain documentation for any obligations regarding personal data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1339" },
                        { "name": "No", "key": "B", "ID": "1340" },
                        { "name": "Partially", "key": "C", "ID": "1341" },
                        { "name": "I don't know", "key": "D", "ID": "1342" }
                    ]
                },
                {
                    "question": "Do you only collect the minimum necessary personal data for your operations?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1343" },
                        { "name": "No", "key": "B", "ID": "1344" },
                        { "name": "Partially", "key": "C", "ID": "1345" },
                        { "name": "I don't know", "key": "D", "ID": "1346" }
                    ]
                },
                {
                    "question": "Do you use personal data only for lawful purposes?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1347" },
                        { "name": "No", "key": "B", "ID": "1348" },
                        { "name": "Partially", "key": "C", "ID": "1349" },
                        { "name": "I don't know", "key": "D", "ID": "1350" }
                    ]
                },
                {
                    "question": "Is internal use of personal data restricted?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1351" },
                        { "name": "No", "key": "B", "ID": "1352" },
                        { "name": "Partially", "key": "C", "ID": "1353" },
                        { "name": "I don't know", "key": "D", "ID": "1354" }
                    ]
                },
                {
                    "question": "Is personal data inventoried?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1355" },
                        { "name": "No", "key": "B", "ID": "1356" },
                        { "name": "Partially", "key": "C", "ID": "1357" },
                        { "name": "I don't know", "key": "D", "ID": "1358" }
                    ]
                },
                {
                    "question": "Is personal data kept only for as long as it is needed?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1359" },
                        { "name": "No", "key": "B", "ID": "1360" },
                        { "name": "Partially", "key": "C", "ID": "1361" },
                        { "name": "I don't know", "key": "D", "ID": "1362" }
                    ]
                },
                {
                    "question": "Is personal data only stored and processed in geographic regions where allowed?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1363" },
                        { "name": "No", "key": "B", "ID": "1364" },
                        { "name": "Partially", "key": "C", "ID": "1365" },
                        { "name": "I don't know", "key": "D", "ID": "1366" }
                    ]
                },
                {
                    "question": "Is personal data that is automatically processed through automated means checked for accuracy, relevance, and completeness during the automation process?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1367" },
                        { "name": "No", "key": "B", "ID": "1368" },
                        { "name": "Partially", "key": "C", "ID": "1369" },
                        { "name": "I don't know", "key": "D", "ID": "1370" }
                    ]
                },
                {
                    "question": "Is personal data verified for accuracy at every processing stage?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1371" },
                        { "name": "No", "key": "B", "ID": "1372" },
                        { "name": "Partially", "key": "C", "ID": "1373" },
                        { "name": "I don't know", "key": "D", "ID": "1374" }
                    ]
                },
                {
                    "question": "Is there a defined individual responsible for the privacy of personal data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1375" },
                        { "name": "No", "key": "B", "ID": "1376" },
                        { "name": "Partially", "key": "C", "ID": "1377" },
                        { "name": "I don't know", "key": "D", "ID": "1378" }
                    ]
                },
                {
                    "question": "Is there a mapping of data flows that includes the processing activities?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1379" },
                        { "name": "No", "key": "B", "ID": "1380" },
                        { "name": "Partially", "key": "C", "ID": "1381" },
                        { "name": "I don't know", "key": "D", "ID": "1382" }
                    ]
                },
                {
                    "question": "Is there a method for an individual to appeal any refusals to correct personal data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1383" },
                        { "name": "No", "key": "B", "ID": "1384" },
                        { "name": "Partially", "key": "C", "ID": "1385" },
                        { "name": "I don't know", "key": "D", "ID": "1386" }
                    ]
                },
                {
                    "question": "Is there a method for an individual to challenge the organization’s privacy practices?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1387" },
                        { "name": "No", "key": "B", "ID": "1388" },
                        { "name": "Partially", "key": "C", "ID": "1389" },
                        { "name": "I don't know", "key": "D", "ID": "1390" }
                    ]
                },
                {
                    "question": "Is there a method for an individual to inquire about their personal data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1391" },
                        { "name": "No", "key": "B", "ID": "1392" },
                        { "name": "Partially", "key": "C", "ID": "1393" },
                        { "name": "I don't know", "key": "D", "ID": "1394" }
                    ]
                },
                {
                    "question": "Is there a procedure for an individual to correct or amend their personal data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1395" },
                        { "name": "No", "key": "B", "ID": "1396" },
                        { "name": "Partially", "key": "C", "ID": "1397" },
                        { "name": "I don't know", "key": "D", "ID": "1398" }
                    ]
                }
            ]
        }
        , {
            "card": "Remote Access",
            "questions": [
                {
                    "question": "Are employees aware of the cyber threats relating to work from home?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1399" },
                        { "name": "No", "key": "B", "ID": "1400" },
                        { "name": "Partially", "key": "C", "ID": "1401" },
                        { "name": "I don't know", "key": "D", "ID": "1402" }
                    ]
                },
                {
                    "question": "Can employees use personal workstations to access company assets remotely?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1403" },
                        { "name": "No", "key": "B", "ID": "1404" },
                        { "name": "Partially", "key": "C", "ID": "1405" },
                        { "name": "I don't know", "key": "D", "ID": "1406" }
                    ]
                },
                {
                    "question": "Can employees use public WiFi networks to access company data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1407" },
                        { "name": "No", "key": "B", "ID": "1408" },
                        { "name": "Partially", "key": "C", "ID": "1409" },
                        { "name": "I don't know", "key": "D", "ID": "1410" }
                    ]
                },
                {
                    "question": "Do you have a remote access policy that is approved by company management?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1411" },
                        { "name": "No", "key": "B", "ID": "1412" },
                        { "name": "Partially", "key": "C", "ID": "1413" },
                        { "name": "I don't know", "key": "D", "ID": "1414" }
                    ]
                },
                {
                    "question": "Do you log all remote access to company assets?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1415" },
                        { "name": "No", "key": "B", "ID": "1416" },
                        { "name": "Partially", "key": "C", "ID": "1417" },
                        { "name": "I don't know", "key": "D", "ID": "1418" }
                    ]
                },
                {
                    "question": "How secure is your remote access?",
                    "options": [
                        { "name": "Requires Multifactor Authentication (MFA)", "key": "A", "ID": "1419" },
                        { "name": "Enforces user-account lockout after several failed login attempts", "key": "B", "ID": "1420" },
                        { "name": "Access to security-relevant data and information is restricted to authorized users only", "key": "C", "ID": "1421" },
                        { "name": "Remote access sessions are controlled and managed via access control points", "key": "D", "ID": "1422" },
                        { "name": "Wipe out data in case of a lost device", "key": "E", "ID": "1423" },
                        { "name": "Disconnect remote access connections that are idle", "key": "F", "ID": "1424" },
                        { "name": "None", "key": "G", "ID": "1425" },
                        { "name": "I don't know", "key": "H", "ID": "1426" }
                    ]
                }
            ]
        }
        , {
            "card": "Risk Management",
            "questions": [
                {
                    "question": "Does your company hold and manage a risk register?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1427" },
                        { "name": "No", "key": "B", "ID": "1428" },
                        { "name": "Partially", "key": "C", "ID": "1429" },
                        { "name": "I don't know", "key": "D", "ID": "1430" }
                    ]
                },
                {
                    "question": "Does your company maintain a risk monitoring process in which the risk register is evaluated routinely?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1431" },
                        { "name": "No", "key": "B", "ID": "1432" },
                        { "name": "Partially", "key": "C", "ID": "1433" },
                        { "name": "I don't know", "key": "D", "ID": "1434" }
                    ]
                },
                {
                    "question": "Does your company maintain a risk remediation plan for all relevant risks and track its execution?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1435" },
                        { "name": "No", "key": "B", "ID": "1436" },
                        { "name": "Partially", "key": "C", "ID": "1437" },
                        { "name": "I don't know", "key": "D", "ID": "1438" }
                    ]
                },
                {
                    "question": "Does your company perform an annual risk assessment?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1439" },
                        { "name": "No", "key": "B", "ID": "1440" },
                        { "name": "Partially", "key": "C", "ID": "1441" },
                        { "name": "I don't know", "key": "D", "ID": "1442" }
                    ]
                },
                {
                    "question": "Has the company established a cybersecurity risk management model?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1443" },
                        { "name": "No", "key": "B", "ID": "1444" },
                        { "name": "Partially", "key": "C", "ID": "1445" },
                        { "name": "I don't know", "key": "D", "ID": "1446" }
                    ]
                },
                {
                    "question": "Has the company identified critical assets and processes, and performed a business impact analysis (BIA)?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1447" },
                        { "name": "No", "key": "B", "ID": "1448" },
                        { "name": "Partially", "key": "C", "ID": "1449" },
                        { "name": "I don't know", "key": "D", "ID": "1450" }
                    ]
                },
                {
                    "question": "Has the company set a KRI (Key risk indicator) program to identify changes in the cybersecurity risk landscape?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1451" },
                        { "name": "No", "key": "B", "ID": "1452" },
                        { "name": "Partially", "key": "C", "ID": "1453" },
                        { "name": "I don't know", "key": "D", "ID": "1454" }
                    ]
                },
                {
                    "question": "Is the company covered by a cyber insurance policy?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1455" },
                        { "name": "No", "key": "B", "ID": "1456" },
                        { "name": "Partially", "key": "C", "ID": "1457" },
                        { "name": "Not relevant or cost-effective", "key": "D", "ID": "1458" },
                        { "name": "I don't know", "key": "E", "ID": "1459" }
                    ]
                }
            ]
        }
        , {
            "card": "Service Provider and Vendor Management",
            "questions": [
                {
                    "question": "Are all service providers obligated to notify the company in case of newly found security vulnerabilities or infrastructure breach?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1460" },
                        { "name": "No", "key": "B", "ID": "1461" },
                        { "name": "Partially", "key": "C", "ID": "1462" },
                        { "name": "I don't know", "key": "D", "ID": "1463" }
                    ]
                },
                {
                    "question": "Are all third-party service-provider vendors verified for being at an adequate security level and for being compliant with relevant regulations?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1464" },
                        { "name": "No", "key": "B", "ID": "1465" },
                        { "name": "Partially", "key": "C", "ID": "1466" },
                        { "name": "I don't know", "key": "D", "ID": "1467" }
                    ]
                },
                {
                    "question": "Do you conduct periodical security assessments of all company service providers?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1468" },
                        { "name": "No", "key": "B", "ID": "1469" },
                        { "name": "Partially", "key": "C", "ID": "1470" },
                        { "name": "I don't know", "key": "D", "ID": "1471" }
                    ]
                },
                {
                    "question": "Do you have a secure service-provider decommission process?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1472" },
                        { "name": "No", "key": "B", "ID": "1473" },
                        { "name": "Partially", "key": "C", "ID": "1474" },
                        { "name": "I don't know", "key": "D", "ID": "1475" }
                    ]
                },
                {
                    "question": "Do you maintain an inventory of all company service-providers and the information regarding their access to company systems or data?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1476" },
                        { "name": "No", "key": "B", "ID": "1477" },
                        { "name": "Partially", "key": "C", "ID": "1478" },
                        { "name": "I don't know", "key": "D", "ID": "1479" }
                    ]
                },
                {
                    "question": "Is there a well-defined Service Provider Management Policy in place, subject to regular review and updates?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1480" },
                        { "name": "No", "key": "B", "ID": "1481" },
                        { "name": "Partially", "key": "C", "ID": "1482" },
                        { "name": "I don't know", "key": "D", "ID": "1483" }
                    ]
                }
            ]
        }
        , {
            "card": "Threat Intelligence",
            "questions": [
                {
                    "question": "Do you collect threat intelligence from multiple sources?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1484" },
                        { "name": "No", "key": "B", "ID": "1485" },
                        { "name": "Partially", "key": "C", "ID": "1486" },
                        { "name": "I don't know", "key": "D", "ID": "1487" }
                    ]
                },
                {
                    "question": "Do you define threat intelligence roles and communicate them to employees?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1488" },
                        { "name": "No", "key": "B", "ID": "1489" },
                        { "name": "Partially", "key": "C", "ID": "1490" },
                        { "name": "I don't know", "key": "D", "ID": "1491" }
                    ]
                },
                {
                    "question": "Do you effectively disseminate threat intelligence to stakeholders?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1492" },
                        { "name": "No", "key": "B", "ID": "1493" },
                        { "name": "Partially", "key": "C", "ID": "1494" },
                        { "name": "I don't know", "key": "D", "ID": "1495" }
                    ]
                },
                {
                    "question": "Do you have mechanisms in place for integrating threat intelligence into decision-making and security strategies?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1496" },
                        { "name": "No", "key": "B", "ID": "1497" },
                        { "name": "Partially", "key": "C", "ID": "1498" },
                        { "name": "I don't know", "key": "D", "ID": "1499" }
                    ]
                },
                {
                    "question": "Do you have tools in place for analyzing and assessing collected threat intelligence?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1500" },
                        { "name": "No", "key": "B", "ID": "1501" },
                        { "name": "Partially", "key": "C", "ID": "1502" },
                        { "name": "I don't know", "key": "D", "ID": "1503" }
                    ]
                },
                {
                    "question": "Do you share threat intelligence with external entities?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1504" },
                        { "name": "No", "key": "B", "ID": "1505" },
                        { "name": "Partially", "key": "C", "ID": "1506" },
                        { "name": "I don't know", "key": "D", "ID": "1507" }
                    ]
                },
                {
                    "question": "Do you train employees to understand and use collected intel?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1508" },
                        { "name": "No", "key": "B", "ID": "1509" },
                        { "name": "Partially", "key": "C", "ID": "1510" },
                        { "name": "I don't know", "key": "D", "ID": "1511" }
                    ]
                },
                {
                    "question": "Is there a process to review and update threat intelligence regularly?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1512" },
                        { "name": "No", "key": "B", "ID": "1513" },
                        { "name": "Partially", "key": "C", "ID": "1514" },
                        { "name": "I don't know", "key": "D", "ID": "1515" }
                    ]
                }
            ]
        }
        , {
            "card": "Vulnerability Management",
            "questions": [
                {
                    "question": "Do you have a penetration testing program?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1516" },
                        { "name": "No", "key": "B", "ID": "1517" },
                        { "name": "Partially", "key": "C", "ID": "1518" },
                        { "name": "I don't know", "key": "D", "ID": "1519" }
                    ]
                },
                {
                    "question": "Do you have a vulnerability management program?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1520" },
                        { "name": "No", "key": "B", "ID": "1521" },
                        { "name": "Partially", "key": "C", "ID": "1522" },
                        { "name": "I don't know", "key": "D", "ID": "1523" }
                    ]
                },
                {
                    "question": "Do you remediate penetration testing found vulnerabilities?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1524" },
                        { "name": "No", "key": "B", "ID": "1525" },
                        { "name": "Partially", "key": "C", "ID": "1526" },
                        { "name": "I don't know", "key": "D", "ID": "1527" }
                    ]
                },
                {
                    "question": "Do you use a Bug Bounty program?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1528" },
                        { "name": "No", "key": "B", "ID": "1529" },
                        { "name": "Partially", "key": "C", "ID": "1530" },
                        { "name": "I don't know", "key": "D", "ID": "1531" }
                    ]
                },
                {
                    "question": "Do you validate security tools following penetration testing?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1532" },
                        { "name": "No", "key": "B", "ID": "1533" },
                        { "name": "Partially", "key": "C", "ID": "1534" },
                        { "name": "I don't know", "key": "D", "ID": "1535" }
                    ]
                },
                {
                    "question": "Does the company have a vulnerability management policy and plan?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1536" },
                        { "name": "No", "key": "B", "ID": "1537" },
                        { "name": "Partially", "key": "C", "ID": "1538" },
                        { "name": "I don't know", "key": "D", "ID": "1539" }
                    ]
                },
                {
                    "question": "What type of penetration testing do you conduct?",
                    "options": [
                        { "name": "Business-critical web applications PT", "key": "A", "ID": "1540" },
                        { "name": "Internal PT", "key": "B", "ID": "1541" },
                        { "name": "External PT", "key": "C", "ID": "1542" },
                        { "name": "Security devices PT", "key": "D", "ID": "1543" },
                        { "name": "None", "key": "E", "ID": "1544" },
                        { "name": "I don't know", "key": "F", "ID": "1545" }
                    ]
                },
                {
                    "question": "Which tools does the company use to assess its vulnerabilities?",
                    "options": [
                        { "name": "An internal vulnerability assessment", "key": "A", "ID": "1546" },
                        { "name": "Web application vulnerability scanning", "key": "B", "ID": "1547" },
                        { "name": "An external vulnerability assessment", "key": "C", "ID": "1548" },
                        { "name": "None", "key": "D", "ID": "1549" },
                        { "name": "I don't know", "key": "E", "ID": "1550" }
                    ]
                }
            ]
        }
        , {
            "card": "Website",
            "questions": [
                {
                    "question": "By what means are company websites and web applications being protected?",
                    "options": [
                        { "name": "Web Access Firewall (WAF)", "key": "A", "ID": "1551" },
                        { "name": "Distributed Denial of Service (DDoS) protection", "key": "B", "ID": "1552" },
                        { "name": "Secure Hypertext Transfer Protocol (HTTPS) communication encryption", "key": "C", "ID": "1553" },
                        { "name": "Vulnerability scannings", "key": "D", "ID": "1554" },
                        { "name": "Penetration testing", "key": "E", "ID": "1555" },
                        { "name": "Secured cookies", "key": "F", "ID": "1556" },
                        { "name": "None", "key": "G", "ID": "1557" },
                        { "name": "I don't know", "key": "H", "ID": "1558" }
                    ]
                },
                {
                    "question": "Does the company website only share information without collecting personal and sensitive data from website users?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1559" },
                        { "name": "No", "key": "B", "ID": "1560" },
                        { "name": "Partially", "key": "C", "ID": "1561" },
                        { "name": "I don't know", "key": "D", "ID": "1562" }
                    ]
                },
                {
                    "question": "Is the company website hosted by an external party?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1563" },
                        { "name": "No", "key": "B", "ID": "1564" },
                        { "name": "Partially", "key": "C", "ID": "1565" },
                        { "name": "I don't know", "key": "D", "ID": "1566" }
                    ]
                },
                {
                    "question": "Is there evidence for a secure hosting infrastructure, such as a policy, document, or contract stating that the hosting service provider follows security standards or compliance?",
                    "options": [
                        { "name": "Yes", "key": "A", "ID": "1567" },
                        { "name": "No", "key": "B", "ID": "1568" },
                        { "name": "Partially", "key": "C", "ID": "1569" },
                        { "name": "I don't know", "key": "D", "ID": "1570" }
                    ]
                }
            ]
        }
    ];

    ngOnInit() {
        //  this.selectedCategory = this.categories[1];
        // console.log(this.example);
        this.http.get<any[]>('/GetAnswers').subscribe(result => {
            this.answers = [];
            result.forEach(element => {
                this.answers.push(element);
            });
            console.log(this.answers);
        }, error => console.error(error));

        //this.categories.forEach(element => {
        //    element.questions.forEach(dat => {
        //        dat.options.foreach(ans => {
        //            if (this.answers.includes(ans.ID)) {

        //            }
        //        })
        //    })
        //})

        

        this.categories.forEach(element => {
            if (element.card == this.example) {
                this.Questions = [];

                this.Questions = element.questions
            }
        });

        this.Questions.forEach(dat => {
            dat.options.foreach(ans => {
                if (this.answers.includes(ans.ID)) {
                    this.selectedCategory = ans;
                }
            })
        })


    }

    ans() {
        console.log(this.selectedCategory)
       
        console.log('ans');

        this.http.post<any>('/SaveAnswer',
            { AnsID :   this.selectedCategory.ID }
        ).subscribe(result => {
            
           
            console.log(result);
        }, error => console.error(error));
        console.log('ans2');
      //  this.events.saveAns(this.selectedCategory.ID)

    
    }


    switchQuestion(Direction) {
        if (Direction == 'Next') {
            this.qIndex = this.qIndex + 1
        } else {
            this.qIndex = this.qIndex - 1
        }
        if (this.qIndex > 0) {
            this.leftDisabled = false;
        } else {
            this.leftDisabled = true;
        }
        if ((this.qIndex + 1) < this.Questions.length) {
            this.rightDisabled = false
        } else {
            this.rightDisabled = true
        }

        this.Questions.forEach(dat => {
            dat.options.foreach(ans => {
                if (this.answers.includes(ans.ID)) {
                    this.selectedCategory = ans;
                }
            })
        })

    }

}
