{
	"info": {
		"_postman_id": "a43c9840-beb7-49ce-99c9-53634bdba40f",
		"name": "roche",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Get presigned url",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{baseURL}}users/7/getPresignedImageData",
					"host": [
						"{{baseURL}}users"
					],
					"path": [
						"7",
						"getPresignedImageData"
					]
				}
			},
			"response": []
		},
		{
			"name": "S3",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "key",
							"value": "5cbbbc1e-419e-4a3a-b451-290b162a1fe4",
							"type": "text"
						},
						{
							"key": "Content-Type",
							"value": "image/tiff",
							"type": "text"
						},
						{
							"key": "bucket",
							"value": "uat-roche-ventana",
							"type": "text"
						},
						{
							"key": "X-Amz-Algorithm",
							"value": "AWS4-HMAC-SHA256",
							"type": "text"
						},
						{
							"key": "X-Amz-Credential",
							"value": "AKIAJPB7QPN243RPMCNQ/20200212/us-west-1/s3/aws4_request",
							"type": "text"
						},
						{
							"key": "X-Amz-Date",
							"value": "20200212T061913Z",
							"type": "text"
						},
						{
							"key": "Policy",
							"value": "eyJleHBpcmF0aW9uIjoiMjAyMC0wMy0yNFQyMjoxOToxM1oiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDAwMDAwMDAwXSx7ImtleSI6IjVjYmJiYzFlLTQxOWUtNGEzYS1iNDUxLTI5MGIxNjJhMWZlNCJ9LHsiQ29udGVudC1UeXBlIjoiaW1hZ2UvdGlmZiJ9LHsiYnVja2V0IjoidWF0LXJvY2hlLXZlbnRhbmEifSx7IlgtQW16LUFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IlgtQW16LUNyZWRlbnRpYWwiOiJBS0lBSlBCN1FQTjI0M1JQTUNOUS8yMDIwMDIxMi91cy13ZXN0LTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMDAyMTJUMDYxOTEzWiJ9XX0=",
							"type": "text"
						},
						{
							"key": "X-Amz-Signature",
							"value": "9f4a487d9022301d3aee68e3061e649984bb820b2cfa7bced83d834460f0e605",
							"type": "text"
						},
						{
							"key": "file",
							"type": "file",
							"src": "/home/ucreate-75/Downloads/file_example_TIFF_1MB.tiff"
						}
					]
				},
				"url": {
					"raw": "https://s3.us-west-1.amazonaws.com/uat-roche-ventana",
					"protocol": "https",
					"host": [
						"s3",
						"us-west-1",
						"amazonaws",
						"com"
					],
					"path": [
						"uat-roche-ventana"
					]
				}
			},
			"response": []
		},
		{
			"name": "Uplaod tiles on s3",
			"request": {
				"method": "POST",
				"header": [],
				"url": {
					"raw": "{{baseURL}}users/uploadTilesToS3",
					"host": [
						"{{baseURL}}users"
					],
					"path": [
						"uploadTilesToS3"
					]
				}
			},
			"response": []
		},
		{
			"name": "Signup",
			"event": [
				{
					"listen": "prerequest",
					"script": {
						"id": "9d005def-04f8-4c1a-a740-1296b4532710",
						"exec": [
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"firstName\":\"Jaspal\",\n\t\"lastName\": \"Singh\",\n\t\"email\":\"jaspalsingh@ucreate.co.in\",\n\t\"password\":\"roche@123\",\n\t\"role\":\"pathologist\"\n}",
					"options": {
						"raw": {}
					}
				},
				"url": {
					"raw": "{{baseURL}}users/signup",
					"host": [
						"{{baseURL}}users"
					],
					"path": [
						"signup"
					]
				}
			},
			"response": []
		},
		{
			"name": "Admin login",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "d2105cc3-4df5-4a14-bf42-d9460f7b791a",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(201);",
							"});",
							"",
							"pm.globals.set(\"admin-token\", pm.response.headers.get('x-access-token'));",
							"",
							"pm.globals.set(\"admin-userId\", response.data.userId);",
							"",
							"pm.globals.set(\"role\", response.data.user.role);"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"email\":\"{{adminEmail}}\",\n\t\"password\":\"{{adminPassword}}\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}sessions/admin",
					"host": [
						"{{baseURL}}sessions"
					],
					"path": [
						"admin"
					]
				}
			},
			"response": []
		},
		{
			"name": "Pathologist login",
			"event": [
				{
					"listen": "prerequest",
					"script": {
						"id": "11a5ded2-0d24-4f9c-a7a4-3a7d361a7338",
						"exec": [
							""
						],
						"type": "text/javascript"
					}
				},
				{
					"listen": "test",
					"script": {
						"id": "a2343ecd-5b32-4a11-9b34-71db6d40d65f",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(201);",
							"});",
							"",
							"pm.globals.set(\"pathologist-token\", pm.response.headers.get('x-access-token'));",
							"",
							"pm.globals.set(\"pathologist-userId\", response.data.userId);",
							"",
							"pm.globals.set(\"pathologistId\", response.data.pathologistId);",
							"",
							"pm.globals.set(\"role\", response.data.user.role);"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"email\":\"{{pathologistEmail}}\",\n\t\"password\":\"{{pathologistPassword}}\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}sessions/pathologist",
					"host": [
						"{{baseURL}}sessions"
					],
					"path": [
						"pathologist"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get pathologists",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "dfeebb67-a506-4683-a934-c17747644d2b",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Records Count\", function(){",
							"    pm.expect(response.data.length).to.be.above(0);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{admin-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{admin-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "admin",
						"type": "text"
					}
				],
				"url": {
					"raw": "{{baseURL}}pathologists",
					"host": [
						"{{baseURL}}pathologists"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get pathologist profile",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5539b070-6af6-43ff-b105-b6e5a11cd9d5",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{pathologist-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{pathologist-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "pathologist",
						"type": "text"
					}
				],
				"url": {
					"raw": "{{baseURL}}pathologists/profile",
					"host": [
						"{{baseURL}}pathologists"
					],
					"path": [
						"profile"
					]
				}
			},
			"response": []
		},
		{
			"name": "Update pathologist",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "da213269-19d0-4150-bf23-c2cc6a3dda6c",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(204);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{pathologist-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{pathologist-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "pathologist",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"isPublic\":true\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}pathologists/profile",
					"host": [
						"{{baseURL}}pathologists"
					],
					"path": [
						"profile"
					]
				}
			},
			"response": []
		},
		{
			"name": "Add assay",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{admin-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "admin",
						"type": "text"
					},
					{
						"key": "x-access-token",
						"value": "{{admin-token}}",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"assayTitle\":\"New Assay Title\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays",
					"host": [
						"{{baseURL}}assays"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get assays",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "3026a27b-91e3-41df-973d-6341aa26aa4f",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Records Count\", function(){",
							"    pm.expect(response.data.length).to.be.above(0);",
							"});",
							"",
							"pm.globals.set(\"assayId\", response.data[0].assayId);"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{admin-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{admin-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "admin",
						"type": "text"
					}
				],
				"url": {
					"raw": "{{baseURL}}assays",
					"host": [
						"{{baseURL}}assays"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get assays by id",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "e4bf4e41-36ae-4158-be53-e001f7f6f146",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{pathologist-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{pathologist-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "pathologist",
						"type": "text"
					}
				],
				"url": {
					"raw": "{{baseURL}}assays/:assayId",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}",
							"type": "string"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Update assay",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "85faa0a2-3c7e-4307-9c46-a7e514018f59",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(204);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{admin-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{admin-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "admin",
						"type": "text"
					},
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"assayTitle\":\"title 3\",\n\t\"description\":\"description 3\" ,\n\t\"assayType\":\"Training\",\n\t\"skillsCovered\":\n\t{ \n\t\t\"skill1\":\"skill one details\" \n\t\t\n\t},\n\t\"learnDescription\":\"learn 3\",\n\t\"published\":true\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Add assay cases",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "67080f07-9ae9-47cc-a93a-9e4242b2768d",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(201);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{admin-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "admin",
						"type": "text"
					},
					{
						"key": "x-access-token",
						"value": "{{admin-token}}",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"caseName\":\"Case name 1\", \n\t\"HAndEImage\": \"dropbox1\",\n\t\"PDL1Image\":\"dropbox2\",\n\t\"score\":10,\n\t\"tumourPresence\":\"Negative\",\n\t\"caseType\":\"Self-Study\",\n\t\"NRCImage\":\"image url\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId/assayCase",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"assayCase"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Pathologist SelfStudy Cases",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5539b070-6af6-43ff-b105-b6e5a11cd9d5",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{pathologist-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{pathologist-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "pathologist",
						"type": "text"
					}
				],
				"url": {
					"raw": "{{baseURL}}pathologists/assays/:assayId/pathologistTestScore/Self-Study",
					"host": [
						"{{baseURL}}pathologists"
					],
					"path": [
						"assays",
						":assayId",
						"pathologistTestScore",
						"Self-Study"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}",
							"type": "string"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Get presigned overview video url",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "4d82ead9-88dd-45f6-a7a7-2907f872324c",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});",
							"",
							"pm.globals.set(\"videoUrl\", response.data.fileName);"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{admin-token}}"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{admin-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "admin"
					}
				],
				"url": {
					"raw": "{{baseURL}}assays/:assayId/presignedOverviewUrl",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"presignedOverviewUrl"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}",
							"type": "string"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Add assay overview",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "67080f07-9ae9-47cc-a93a-9e4242b2768d",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(201);",
							"});",
							"",
							"pm.globals.set(\"assayOverviewId\", response.data.assayOverviewId);"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{admin-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "admin"
					},
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{admin-token}}"
					},
					{
						"key": "",
						"value": "true",
						"type": "text",
						"disabled": true
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"videoTitle\":\"Case name 1\", \n\t\"overviewType\": \"Basics\",\n\t\"videoUrl\":\"{{demoVideoUrl}}\",\n\t\"postmanTesting\": true\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId/assayOverview",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"assayOverview"
					],
					"variable": [
						{
							"id": "f256071a-3027-4943-9394-7a081ab78bd9",
							"key": "assayId",
							"value": "{{assayId}}",
							"type": "string"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "get assay overview by id",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "67080f07-9ae9-47cc-a93a-9e4242b2768d",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{admin-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "admin"
					},
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{admin-token}}"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId/assayOverview/:assayOverviewId",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"assayOverview",
						":assayOverviewId"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}"
						},
						{
							"key": "assayOverviewId",
							"value": "{{assayOverviewId}}"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Update assay overview",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "67080f07-9ae9-47cc-a93a-9e4242b2768d",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{admin-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "admin"
					},
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{admin-token}}"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"videoTitle\":\"New videp title\", \n\t\"overviewType\": \"Basics\",\n\t\"videoUrl\":\"345ff30e-b60b-44dc-bb5d-1b403466c091\",\n\t\"postmanTesting\": true\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId/assayOverview/:assayOverviewId",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"assayOverview",
						":assayOverviewId"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}"
						},
						{
							"key": "assayOverviewId",
							"value": "{{assayOverviewId}}"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "add assay overview note",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7384a1eb-b977-42b6-948f-6d7fac47303a",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(204);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{pathologist-token}}"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{pathologist-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "pathologist"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"note\": \"Note 1: assay training starts 2\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId/assayOverview/:assayOverviewId/note",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"assayOverview",
						":assayOverviewId",
						"note"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}",
							"type": "string"
						},
						{
							"key": "assayOverviewId",
							"value": "{{assayOverviewId}}",
							"type": "string"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Get assay overview notes",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7384a1eb-b977-42b6-948f-6d7fac47303a",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Records Count\", function(){",
							"    pm.expect(response.data.length).to.be.above(0);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{pathologist-token}}"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{pathologist-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "pathologist"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId/assayOverview/:assayOverviewId/notes",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"assayOverview",
						":assayOverviewId",
						"notes"
					],
					"variable": [
						{
							"key": "assayId",
							"value": "{{assayId}}",
							"type": "string"
						},
						{
							"key": "assayOverviewId",
							"value": "{{assayOverviewId}}",
							"type": "string"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Get assay notes",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7384a1eb-b977-42b6-948f-6d7fac47303a",
						"exec": [
							"const response = pm.response.json();",
							"",
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Records Count\", function(){",
							"    pm.expect(response.data.length).to.be.above(0);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{pathologist-token}}"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{pathologist-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "pathologist"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}assays/:assayId/assayOverviewNotes",
					"host": [
						"{{baseURL}}assays"
					],
					"path": [
						":assayId",
						"assayOverviewNotes"
					],
					"variable": [
						{
							"id": "8ba41640-9ae1-4e30-b22b-c38f9149b5d2",
							"key": "assayId",
							"value": "{{assayId}}",
							"type": "string"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "add team",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "12340c7b-5986-4f11-a945-dd8a1f4f6d1b",
						"exec": [
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "x-access-token",
						"type": "text",
						"value": "{{pathologist-token}}"
					},
					{
						"key": "userId",
						"type": "text",
						"value": "{{pathologist-userId}}"
					},
					{
						"key": "role",
						"type": "text",
						"value": "pathologist"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"teamName\": \"Team 6\",\n\t\"description\": \"description\",\n\t\"teamType\":\"Training\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseURL}}teams",
					"host": [
						"{{baseURL}}teams"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Teams",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5539b070-6af6-43ff-b105-b6e5a11cd9d5",
						"exec": [
							"pm.test(\"Status check\", function(){",
							"   pm.response.to.have.status(200);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-access-token",
						"value": "{{pathologist-token}}",
						"type": "text"
					},
					{
						"key": "userId",
						"value": "{{pathologist-userId}}",
						"type": "text"
					},
					{
						"key": "role",
						"value": "pathologist",
						"type": "text"
					}
				],
				"url": {
					"raw": "{{baseURL}}teams",
					"host": [
						"{{baseURL}}teams"
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}